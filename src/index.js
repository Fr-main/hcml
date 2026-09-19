// HCML Worker 入口（Cloudflare Workers 兼容）
//
// 路由：
//   GET  /          首页（带在线转换器 UI）
//   GET  /health    健康检查
//   ANY  /convert   ⭐ 主 API：把 HCML 转为 HTML
//   ANY  /anything.hcml   扩展名后缀触发转换
//
// CORS：
//   需要让「用户下载的 HTML 文件」通过 fetch() 在浏览器里
//   直接访问本 Worker，因此对所有请求都加上通用的跨域响应头，
//   并对 OPTIONS 预检快速返回 204。

import { hcmlToHtml } from "./convert.js";

const API_PATH = "/convert";

// 给响应套一层跨域头，浏览器（包括 file://）都能直接 fetch
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Requested-With, Accept, Origin",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    // 0. CORS 预检：直接 204
    if (method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          ...CORS_HEADERS,
          "content-type": "text/plain; charset=utf-8",
        },
      });
    }

    // 1. 首页 / 健康检查（只对 GET 生效，POST 打到这里一律走 API）
    if ((url.pathname === "/" || url.pathname === "" || url.pathname === "/health")
        && method === "GET") {
      return withCORS(
        new Response(HELLO_PAGE, {
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "no-store",
          },
        })
      );
    }

    // 2. 其余所有请求一律走 HCML -> HTML 转换器
    let hcml = url.searchParams.get("hcml") || "";

    const METHODS_WITH_BODY = new Set(["POST", "PUT", "PATCH"]);
    if (!hcml && METHODS_WITH_BODY.has(method)) {
      const ct = request.headers.get("content-type") || "";
      const body = await request.text();
      if (body && body.length) {
        hcml = body;
      }
      if (ct.includes("form-urlencoded") && body.includes("hcml=")) {
        const params = new URLSearchParams(body);
        const fromForm = params.get("hcml");
        if (fromForm) hcml = fromForm;
      }
    }

    if (!hcml) {
      return withCORS(
        new Response(
          JSON.stringify({
            ok: false,
            error: "缺少 HCML 内容",
            hint: "POST /convert body=@xxx.hcml 或 GET /convert?hcml=...",
          }),
          {
            status: 400,
            headers: { "content-type": "application/json; charset=utf-8" },
          }
        )
      );
    }

    let html;
    try {
      html = hcmlToHtml(hcml);
    } catch (err) {
      return withCORS(
        new Response(
          JSON.stringify({
            ok: false,
            error: err && err.message ? err.message : String(err),
          }),
          {
            status: 500,
            headers: { "content-type": "application/json; charset=utf-8" },
          }
        )
      );
    }

    return withCORS(
      new Response(html, {
        headers: {
          "content-type": "text/html; charset=utf-8",
          "x-hcml": "converted",
          "cache-control": "no-store",
        },
      })
    );
  },
};

function withCORS(resp) {
  for (const [k, v] of Object.entries(CORS_HEADERS)) {
    if (!resp.headers.has(k)) resp.headers.set(k, v);
  }
  return resp;
}

// ---------------------------------------------------------------------------
// 下面是首页 HELLO_PAGE + 一段"保存即用"的 HTML 模板 TEMPLATE_HTML
// TEMPLATE_HTML 会被直接塞进首页顶部的代码框，用户点"复制"就能粘贴保存。

// 保存即用的 HTML 模板：
//   用户把这个模板整体保存为 foo.html，把 <script type="application/hcml">
//   里的内容替换成自己写的 HCML，然后双击用浏览器打开。
//   页面加载后会自动 POST 到 HCML_API，拿到 HTML 后 document.open/write 渲染。
const HCML_API = "https://hcml-api.rewp.de5.net/convert";

// 返回的 <html> 模板渲染函数（供独立 HTML 和首页预览按钮复用）
function applyRemoteHtml(containerDoc, html) {
  const parser = new (containerDoc.defaultView?.DOMParser || DOMParser)();
  const tmp = parser.parseFromString(html, "text/html");

  // 1) 合并 head：把 title / meta charset / style / link 等都换成 HCML 里的
  if (tmp.head) {
    // 清空当前 head 并把 tmp.head 的子节点逐个移入
    containerDoc.head.innerHTML = "";
    while (tmp.head.firstChild) {
      containerDoc.head.appendChild(tmp.head.firstChild);
    }
    // 确保 charset 不丢
    if (!containerDoc.head.querySelector("meta[charset]")) {
      const m = containerDoc.createElement("meta");
      m.setAttribute("charset", "UTF-8");
      containerDoc.head.prepend(m);
    }
  }

  // 2) 覆盖 body 内容
  if (tmp.body) {
    containerDoc.body.innerHTML = tmp.body.innerHTML;
    // 3) innerHTML 不会重新执行内嵌 <script>，主动 eval 一次
    tmp.body.querySelectorAll("script").forEach(old => {
      const s = containerDoc.createElement("script");
      if (old.src) {
        s.src = old.src;
      } else {
        s.textContent = old.textContent;
      }
      containerDoc.body.appendChild(s);
    });
  }
}

const TEMPLATE_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>HCML 加载中…</title>
<style>
  html,body{margin:0;padding:0;font-family:-apple-system,Segoe UI,Roboto,"PingFang SC","Microsoft YaHei",sans-serif}
  .hcml-loading{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#fafafa;color:#64748b;flex-direction:column;gap:10px}
  .hcml-loading .spinner{width:36px;height:36px;border:3px solid #e2e8f0;border-top-color:#2563eb;border-radius:50%;animation:hcml-spin 0.9s linear infinite}
  @keyframes hcml-spin{to{transform:rotate(360deg)}}
  .hcml-error{padding:16px 20px;margin:32px auto;max-width:640px;background:#fff1f2;border:1px solid #fecdd3;border-radius:10px;color:#9f1239;font-family:ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-all}
</style>
<!--
  保存即用：
  1) 把 <script type="application/hcml"> 里的中文 HTML 改成你自己的。
  2) 另存为 .html，双击打开——浏览器会自动请求 HCML_API 并渲染。
  3) 渲染完成后整个页面（包括浏览器标签页标题）会完全变成 HCML 里写的那份。
-->
</head>
<body>
  <!-- ① HCML 源码区：只改这里 -->
  <script type="application/hcml">
<超文本标记语言文档>
  <头部>
    <标题>HCML 示例页面</标题>
  </头部>
  <主体>
    <一级标题>欢迎使用 HCML 独立页面</一级标题>
    <段落>把上面这个 script type="application/hcml" 里的中文 HTML 改成你自己的，浏览器打开时就会自动请求 HCML 服务并渲染。</段落>
    <列表>
      <列表项>第 1 条</列表项>
      <列表项>第 2 条</列表项>
    </列表>
  </主体>
</超文本标记语言文档>
  </script>

  <!-- ② loading 占位（渲染成功后整页会被替换掉） -->
  <div class="hcml-loading" id="hcml-loading">
    <div class="spinner"></div>
    <div>HCML 转换中…</div>
  </div>

  <!-- ③ 渲染脚本：不要改 -->
  <script>
    (async function(){
      const HCML_API = ${JSON.stringify(HCML_API)};
      const src = document.querySelector('script[type="application/hcml"]');
      if (!src) {
        const load = document.getElementById('hcml-loading');
        if (load) load.outerHTML = '<div class="hcml-error">未找到 HCML 源码区 &lt;script type="application/hcml"&gt;</div>';
        return;
      }
      try {
        const resp = await fetch(HCML_API, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: src.textContent || '',
        });
        if (!resp.ok) throw new Error('HTTP ' + resp.status);
        const html = await resp.text();
        // ── 关键方案：把返回的 HTML 做成 Blob URL，location.replace 导航过去 ──
        // 这样做的好处：
        //  a) 相当于浏览器加载了一份"真正的文件"，内嵌 <script>/<style>/<link>/<title> 全部自动生效，
        //     不需要像 innerHTML 那样手动挂回去
        //  b) 和本地 file:// 几乎一样，不管模板是从本地还是某个网页上打开的都能工作
        //  c) 导航成功后，浏览器标签页标题会自动变成 HCML 里写的 <标题>
        //  d) 不会留下历史记录（replace），用户点后退就是原入口
        const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        location.replace(url);
        // 理论上 replace 之后脚本就停了；放个兜底 revoke 也行
        // setTimeout(() => URL.revokeObjectURL(url), 30000);
      } catch (err) {
        const load = document.getElementById('hcml-loading');
        if (load) load.outerHTML = '<div class="hcml-error">HCML 请求失败：' + err.message + '</div>';
      }
    })();
  </script>
</body>
</html>`;

// 把模板里的 < > 等做轻量转义，以便安全地嵌进首页 textarea/script 标签
function embedCode(src) {
  return src
    .replace(/<\/script>/gi, "<\\/script>");
}

const HELLO_PAGE = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>HCML Worker</title>
<style>
  body{font-family:-apple-system,Segoe UI,Roboto,"PingFang SC","Microsoft YaHei",sans-serif;max-width:820px;margin:24px auto;padding:0 20px;color:#222;line-height:1.7}
  code,pre{background:#f4f4f5;padding:2px 6px;border-radius:4px;font-family:ui-monospace,Menlo,Consolas,monospace}
  pre{padding:12px;overflow:auto}
  h1,h2{color:#0f172a}
  h1{font-size:1.5rem;margin-bottom:0.25em}
  a{color:#2563eb}
  .row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
  textarea{font-family:ui-monospace,Menlo,Consolas,monospace}
  .hint{background:#eff6ff;border-left:4px solid #2563eb;padding:10px 14px;border-radius:6px;margin:12px 0;font-size:14px;color:#1e3a8a}
  .code-box{background:#0f172a;color:#e2e8f0;border-radius:10px;padding:14px;max-height:360px;overflow:auto;font-size:13px;line-height:1.5}
  button{background:#2563eb;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:14px}
  button:hover{background:#1d4ed8}
  button.ghost{background:transparent;color:#2563eb;border:1px solid #2563eb}
  button.ghost:hover{background:#eff6ff}
  .ok{color:#16a34a;font-weight:500}
  .warn{color:#b45309}
</style>
</head>
<body>
<h1>🀄 HCML Worker</h1>
<p>把 HCML（中文 HTML 标记语言）转换为标准 HTML 的服务。</p>

<h2>✨ 保存即用的 HTML 模板（推荐从这里开始）</h2>
<div class="hint">
  <b>用法：</b>复制下面的代码 → 全部粘贴进一个空的 .html 文件 →
  把里面 <code>&lt;script type="application/hcml"&gt;…&lt;/script&gt;</code>
  中的 HCML 改成你自己的 → 保存 → 用任意浏览器打开即可。
  打开时会自动向 <code>${HCML_API}</code> 发送请求并渲染。
</div>
<div class="row" style="margin:6px 0">
  <button type="button" id="copy-tpl">📋 复制完整 HTML</button>
  <button type="button" id="dl-tpl" class="ghost">⬇️ 下载为 hcml-template.html</button>
  <span id="tpl-stat" style="margin-left:auto;color:#555"></span>
</div>
<pre class="code-box" id="tpl-box"></pre>

<h2>API</h2>
<pre>POST ${HCML_API}
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
<textarea id="in" rows="14" style="width:100%">${'<超文本标记语言文档>\n  <头部><标题>HCML 测试</标题></头部>\n  <主体><段落>Hello HCML！</段落></主体>\n</超文本标记语言文档>'}</textarea>
<div class="row" style="margin:8px 0">
  <button type="button" id="go">转换 →</button>
  <button type="button" id="open" class="ghost">在新标签预览</button>
</div>
<textarea id="out" rows="14" style="width:100%;background:#f4f4f5"></textarea>

<script>
  const $ = id => document.getElementById(id);
  const API = ${JSON.stringify(HCML_API)};

  // —— 顶部模板区：直接渲染 TEMPLATE_HTML，并提供复制/下载 ——
  const TEMPLATE_HTML = ${JSON.stringify(embedCode(TEMPLATE_HTML))};
  $("tpl-box").textContent = TEMPLATE_HTML;

  async function copyText(text){
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch(e){
      // 兜底：隐藏 textarea 选择
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch(_) {}
      document.body.removeChild(ta);
      return true;
    }
  }

  $("copy-tpl").onclick = async () => {
    const ok = await copyText(TEMPLATE_HTML);
    $("tpl-stat").textContent = ok ? "已复制，粘贴保存即可。" : "复制失败，请手动选中上方代码。";
  };

  $("dl-tpl").onclick = () => {
    const blob = new Blob([TEMPLATE_HTML], {type:"text/html;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hcml-template.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  // —— 在线转换区 ——
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
      $("stat").textContent = "请求失败（可能是 CORS 被浏览器拦截）：" + e.message;
    }
  };

  $("open").onclick = () => {
    const html = $("out").value || "<!DOCTYPE html><html><body><p>请先点击『转换 →』</p></body></html>";
    // 用 Blob URL 打开，完全规避 document.write 的同步限制与 CSP 问题
    const blob = new Blob([html], {type: "text/html;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    window.open(url);
    // 2 秒后释放（让新窗口有时间读取）
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
</script>

<h2>关于</h2>
<p>HCML 项目：<a href="https://github.com/Fr-main/hcml">github.com/Fr-main/hcml</a></p>
</body>
</html>`;
