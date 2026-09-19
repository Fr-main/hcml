# HCML —— 中文 HTML 标记语言

> **[English version](./README.en.md)** · **[标签映射表](./docs/tags.zh-CN.md)**

HCML（Chinese HTML Markup Language）把 HTML 的**英文标签**换成了**中文标签**。
同一个英文标签可以有**多个中文别名**（都表示同一个东西）。
整个转换器运行在 [Cloudflare Workers](https://workers.cloudflare.com/) 上，
向 Worker 发送 HCML 文本，它会返回可以直接被浏览器渲染的标准 HTML。

## 在线体验

| 链接 | 说明 |
| --- | --- |
| 🌐 **[官方在线转换器](https://hcml-api.rewp.de5.net/)** | 打开后可以直接试写 HCML，点"转换 →"看效果 |
| 📄 **[保存即用的独立 HTML 模板](https://hcml-api.rewp.de5.net/template.html)** | 浏览器里打开 → 改里面的中文标签 → 保存 → 双击即可在新窗口渲染 |
| 🧪 `POST /convert` | curl / JS fetch 都能直接调用的主 API |
| 📖 **[HCML ↔ HTML 标签完整映射表](./docs/tags.zh-CN.md)** | 所有支持的中文标签名 / 中文属性名对照表 |

## HCML 示例

```xml
<超文本标记语言文档>
  <头部>
    <标题>我的第一个 HCML 页面</标题>
    <元信息 字符集="UTF-8" />
  </头部>
  <主体>
    <一级标题>欢迎使用 HCML</一级标题>
    <段落>这是一段正文，里面有 <超链接 链接地址="https://example.com">一个链接</超链接>。</段落>
    <列表>
      <列表项>条目 1</列表项>
      <列表项>条目 2</列表项>
    </列表>
  </主体>
</超文本标记语言文档>
```

转换成的 HTML（浏览器可以直接打开）：

```html
<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8"><title>我的第一个 HCML 页面</title></head>
  <body>
    <h1>欢迎使用 HCML</h1>
    <p>这是一段正文，里面有 <a href="https://example.com">一个链接</a>。</p>
    <ul>
      <li>条目 1</li>
      <li>条目 2</li>
    </ul>
  </body>
</html>
```

## 怎么用

### 1. 调用 API

```bash
# 用 curl 直接转换
curl -X POST https://hcml-api.rewp.de5.net/convert \
     -H 'Content-Type: text/plain;charset=utf-8' \
     --data-binary @example.hcml \
  > output.html

# 或在浏览器里用 JS
const html = await fetch("https://hcml-api.rewp.de5.net/convert", {
  method: "POST",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: "<超文本标记语言文档><主体><段落>你好</段落></主体></超文本标记语言文档>",
}).then(r => r.text());
```

返回值 `Content-Type: text/html; charset=utf-8`，浏览器直接就能打开。

### 2. 用保存即用模板（零开发成本）

打开 **[template.html](https://hcml-api.rewp.de5.net/template.html)** → 浏览器菜单里「另存为」→
在保存下来的 `.html` 文件里修改 `<script type="application/hcml">…</script>` 中的中文标签 →
**双击**，浏览器会自动请求 HCML API，并在新窗口渲染结果。

### 3. 自己部署

HCML 是一个 Cloudflare Workers 项目：

```bash
npm install
npx wrangler login

# 编辑 wrangler.toml 填上你的 account_id
npx wrangler deploy
```

## 语言规则

- **标签名**支持任意 Unicode 字母/数字，中文当然可以。
- **空元素**（`img` / `br` / `hr` / `input` ...）写成 `<图片 源="x.png" />` 或 `<图片 源="x.png">` 都能识别。
- **原始块** `<脚本>` / `<样式>` / `<noscript>` / `<textarea>` 的内部内容**保持原样**，不会被当成标签。
- **注释** `<!-- ... -->` 会被保留。
- **未知中文标签**不会破坏 HTML 结构，而是被降级成纯文本（例如 `&lt;未识别标签:某某&gt;`）。
- **HCML 属性名也支持中文**，见 **[标签映射表](./docs/tags.zh-CN.md)**。

## 文档导航

| 文档 | 中文 | 英文 |
| --- | --- | --- |
| 项目首页（说明 + 上手） | [README.md](./README.md) | [README.en.md](./README.en.md) |
| 标签 / 属性完整映射表 | [docs/tags.zh-CN.md](./docs/tags.zh-CN.md) | [docs/tags.en.md](./docs/tags.en.md) |
| Worker API 路由 | 见本文档「怎么用 · 调用 API」 | [README.en.md](#using-the-api) |

## 映射表在哪里定义？

详见 [`src/map.js`](./src/map.js)。要加中文别名，直接往 `TAG_MAP` 或 `ATTR_MAP` 里加键值对即可。
标签映射表仓库中的 `docs/tags.*.md` 由 `src/map.js` 自动生成。

```js
// src/map.js
export const TAG_MAP = {
  "超文本标记语言文档": "html",   // 这个中文名 → 标准 <html>
  "网页根元素":        "html",   // 同一个英文标签可以有多个中文别名
  "头部":              "head",
  // ...
};
```

## 目录结构

```
hcml/
├── src/
│   ├── index.js       # Cloudflare Workers fetch 入口
│   ├── convert.js     # HCML ↔ HTML 双向转换器
│   └── map.js         # 中文 ↔ 英文 标签 / 属性映射表
├── public/
│   └── template.html  # "保存即用"的独立 HTML 模板
├── docs/
│   ├── tags.zh-CN.md  # 中文标签映射表（中文）
│   └── tags.en.md     # 中文标签映射表（英文）
├── wrangler.toml      # Cloudflare Workers 配置
├── package.json
└── README.md / README.en.md
```

## License

MIT
