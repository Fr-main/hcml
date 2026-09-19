// HCML Worker 入口（Cloudflare Workers 兼容）
//
// 支持的请求方式：
//   POST /           body 为 .hcml 内容，返回 HTML
//   PUT  /xxx.hcml   body 为 .hcml 内容，返回 HTML
//   GET  /xxx.hcml   查询 query 参数 ?hcml=... 或直接获取 URL 指向的 .hcml 文本
//   也支持 ?hcml=... 查询参数形式
//
// 返回：Content-Type: text/html; charset=utf-8

import { hcmlToHtml } from "./convert.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. 若请求路径是 "/" 或 "/health" -> 返回健康检查或首页说明
    if (url.pathname === "/" || url.pathname === "" || url.pathname === "/health") {
      return new Response(HELLO_PAGE, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    // 2. 先尝试从 query 参数取
    let hcml = url.searchParams.get("hcml");
    let isText = false; // 标记是否是纯文本 body

    // 3. 再看 body
    if (!hcml && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH")) {
      const ct = request.headers.get("content-type") || "";
      const body = await request.text();
      if (body && body.length) {
        hcml = body;
        isText = true;
      }
      // 兼容 application/x-www-form-urlencoded 或 multipart
      if (ct.includes("form-urlencoded") && body.includes("hcml=")) {
        const params = new URLSearchParams(body);
        hcml = params.get("hcml") || hcml;
      }
    }

    if (!hcml) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: "缺少 HCML 内容",
          hint: "POST /  body 为 .hcml 文本；或使用查询参数 ?hcml=...",
        }),
        {
          status: 400,
          headers: { "content-type": "application/json; charset=utf-8" },
        }
      );
    }

    // 4. 处理扩展名标识：允许以 .hcml 结尾的路径
    if (/\.hcml$/i.test(url.pathname) && typeof hcml === "string" && hcml.length) {
      // OK
    }

    let html;
    try {
      html = hcmlToHtml(hcml);
    } catch (err) {
      return new Response(
        JSON.stringify({ ok: false, error: err && err.message ? err.message : String(err) }),
        {
          status: 500,
          headers: { "content-type": "application/json; charset=utf-8" },
        }
      );
    }

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
</style>
</head>
<body>
<h1>🀄 HCML Worker</h1>
<p>这是一个运行在 Cloudflare Workers 上的服务端转换器：将 <b>HCML</b>（中文 HTML 标记语言）转换为标准 HTML。</p>

<h2>使用方式</h2>
<pre>POST /  HTTP/1.1
Content-Type: text/plain

&lt;超文本标记语言文档&gt;
  &lt;头部&gt;&lt;标题&gt;你好&lt;/标题&gt;&lt;/头部&gt;
  &lt;主体&gt;&lt;段落&gt;世界！&lt;/段落&gt;&lt;/主体&gt;
&lt;/超文本标记语言文档&gt;
</pre>

<h2>示例 HCML</h2>
<pre>&lt;超文本标记语言文档&gt;
  &lt;头部&gt;
    &lt;标题&gt;HCML 示例&lt;/标题&gt;
  &lt;/头部&gt;
  &lt;主体&gt;
    &lt;一级标题&gt;欢迎使用 HCML&lt;/一级标题&gt;
    &lt;段落&gt;这是一段中文 &lt;超链接 href="https://example.com"&gt;超链接&lt;/超链接&gt;。&lt;/段落&gt;
    &lt;图片 src="pic.png" 替代文本="示意"&gt;
  &lt;/主体&gt;
&lt;/超文本标记语言文档&gt;
</pre>

<h2>在线转换</h2>
<form id="f" method="POST" action="#">
<textarea id="in" rows="14" style="width:100%;font-family:ui-monospace,Menlo,Consolas,monospace">&lt;超文本标记语言文档&gt;
  &lt;头部&gt;&lt;标题&gt;测试&lt;/标题&gt;&lt;/头部&gt;
  &lt;主体&gt;&lt;段落&gt;Hello HCML！&lt;/段落&gt;&lt;/主体&gt;
&lt;/超文本标记语言文档&gt;</textarea>
<div class="row" style="margin:8px 0">
  <button type="button" id="go">转换 →</button>
  <span id="stat"></span>
</div>
<textarea id="out" rows="14" style="width:100%;font-family:ui-monospace,Menlo,Consolas,monospace;background:#f4f4f5"></textarea>
</form>

<script>
  const $ = id => document.getElementById(id);
  $("go").onclick = async () => {
    const resp = await fetch(location.pathname + location.search, {
      method: "POST",
      headers: {"Content-Type":"text/plain"},
      body: $("in").value,
    });
    $("out").value = await resp.text();
    $("stat").textContent = "HTTP " + resp.status;
  };
</script>

<h2>关于</h2>
<p>HCML 项目：<a href="https://github.com/Fr-main/hcml">github.com/Fr-main/hcml</a></p>
</body>
</html>`;
