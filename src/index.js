// HCML Worker 入口（Cloudflare Workers 兼容）
//
// 路由：
//   GET  /          首页（带在线转换器 UI）
//   GET  /health    健康检查
//   ANY  /convert   ⭐ 主 API：把 HCML 转为 HTML
//                   - body 为 .hcml 文本，或查询参数 ?hcml=...
//   ANY  /anything.hcml   扩展名后缀触发转换（同样走 /convert 逻辑）
//
// 为什么把 API 固定到 /convert？
//   首页和转换器曾经共用同一个路径 "/", 在线按钮 fetch 回自己时被首页
//   路由吞掉，导致"输出了首页源码而不是转换结果"。固定 /convert 后，
//   首页只展示 UI, 转换 API 永远不会误伤。
//
// 返回：Content-Type: text/html; charset=utf-8

import { hcmlToHtml } from "./convert.js";

const API_PATH = "/convert";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ---- 1. 首页 / 健康检查（只对 GET 生效，POST 打到这里一律走 API） ----
    if ((url.pathname === "/" || url.pathname === "" || url.pathname === "/health")
        && request.method === "GET") {
      return new Response(HELLO_PAGE, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    // ---- 2. 其余所有请求一律走 HCML -> HTML 转换器 ----
    //    路由不做硬性限制：任何 path + 任何方法都可触发转换。
    //    这样旧客户端 POST "/" 也能正常工作（不再被首页吞）。

    let hcml = url.searchParams.get("hcml") || "";

    // 再看 body
    const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH"]);
    if (!hcml && METHODS_WITH_BODY.has(request.method)) {
      const ct = request.headers.get("content-type") || "";
      const body = await request.text();
      if (body && body.length) {
        hcml = body;
      }
      // 兼容 application/x-www-form-urlencoded 或 multipart
      if (ct.includes("form-urlencoded") && body.includes("hcml=")) {
        const params = new URLSearchParams(body);
        const fromForm = params.get("hcml");
        if (fromForm) hcml = fromForm;
      }
    }

    if (!hcml) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "缺少 HCML 内容",
          hint: "POST /convert body=@xxx.hcml 或 GET /convert?hcml=...",
        }),
        {
          status: 400,
          headers: { "content-type": "application/json; charset=utf-8" },
        }
      );
    }

    let html;
    try {
      html = hcmlToHtml(hcml);
    } catch (err) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: err && err.message ? err.message : String(err),
        }),
        {
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" },
        }
      );
    }

    // 返回真正的 HTML，而不是原输入
    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "x-hcml": "converted",
        "cache-control": "no-store",
      },
    });
  },
};

const HELLO_PAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>HCML Worker</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,"PingFang SC","Microsoft YaHei",sans-serif;max-width:780px;margin:40px auto;padding:0 20px;color:#222;line-height:1.7}
  code,pre{background:#f4f4f5;padding:2px 6px;border-radius:4px;font-family:ui-monospace,Menlo,Consolas,monospace}
  pre{padding:12px;overflow:auto}
  h1,h2{color:#0f172a}
  a{color:#2563eb}
  .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
  textarea{font-family:ui-monospace,Menlo,Consolas,monospace}
</style>
</head>
<body>
<h1>🀄 HCML Worker</h1>
<p>把 HCML（中文 HTML 标记语言）转换为标准 HTML 的服务。</p>

<h2>API</h2>
<pre>POST /convert
Content-Type: text/plain

&lt;超文本标记语言文档&gt;
  &lt;头部&gt;&lt;标题&gt;你好&lt;/标题&gt;&lt;/头部&gt;
  &lt;主体&gt;&lt;段落&gt;世界！&lt;/段落&gt;&lt;/主体&gt;
&lt;/超文本标记语言文档&gt;
</pre>

<h2>在线转换</h2>
<div class="row" style="margin-bottom:6px">
  <label>HCML 输入：</label>
  <span id="stat" style="margin-left:auto;color:#555"></span>
</div>
<textarea id="in" rows="14" style="width:100%;font-family:ui-monospace,Menlo,Consolas,monospace">&lt;超文本标记语言文档&gt;
  &lt;头部&gt;&lt;标题&gt;HCML 测试&lt;/标题&gt;&lt;/头部&gt;
  &lt;主体&gt;&lt;段落&gt;Hello HCML！&lt;/段落&gt;&lt;/主体&gt;
&lt;/超文本标记语言文档&gt;</textarea>
<div class="row" style="margin:8px 0">
  <button type="button" id="go">转换 →</button>
  <button type="button" id="open" style="margin-left:8px">在新标签预览</button>
</div>
<textarea id="out" rows="14" style="width:100%;font-family:ui-monospace,Menlo,Consolas,monospace;background:#f4f4f5"></textarea>

<script>
  const $ = id => document.getElementById(id);
  const API = "/convert";
  $("go").onclick = async () => {
    $("stat").textContent = "请求中…";
    try {
      const resp = await fetch(API, {
        method: "POST",
        headers: {"Content-Type": "text/plain;charset=utf-8"},
        body: $("in").value,
      });
      const text = await resp.text();
      $("out").value = text;
      $("stat").textContent = "HTTP " + resp.status + "  ← " + API;
    } catch (e) {
      $("stat").textContent = "请求失败: " + e.message;
    }
  };
  $("open").onclick = () => {
    const html = $("out").value || "<p>请先点击『转换 →』</p>";
    const win = window.open();
    win.document.open();
    win.document.write(html);
    win.document.close();
  };
</script>

<h2>关于</h2>
<p>HCML 项目：<a href="https://github.com/Fr-main/hcml">github.com/Fr-main/hcml</a></p>
</body>
</html>`;
