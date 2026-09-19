# HCML — Chinese HTML Markup Language

> **[中文版](./README.md)** · **[Tag reference →](./docs/tags.en.md)**

HCML (Chinese HTML Markup Language) is HTML with all its **English tags**
replaced by **Chinese tags**. One HTML tag can have **multiple Chinese aliases**
(all mean the same thing). The whole converter runs on
[Cloudflare Workers](https://workers.cloudflare.com/): send HCML to the Worker,
get back valid HTML that any browser can render.

## Try it online

| Link | What it is |
| --- | --- |
| 🌐 **[Official live converter](https://hcml-api.rewp.de5.net/)** | Online playground — write HCML, click *Convert* and see the result |
| 📄 **[Drop-in standalone template](https://hcml-api.rewp.de5.net/template.html)** | Save the page, edit the Chinese tags inside, open the saved file → it auto-fetches and renders in a new window |
| 🧪 `POST /convert` | The public API — works with `curl`, JS `fetch`, etc. |
| 📖 **[Complete HCML ↔ HTML tag reference](./docs/tags.en.md)** | Every supported Chinese tag name and Chinese attribute name |

## What HCML looks like

```xml
<超文本标记语言文档>
  <头部>
    <标题>My first HCML page</标题>
    <元信息 字符集="UTF-8" />
  </头部>
  <主体>
    <一级标题>Hello from HCML</一级标题>
    <段落>This is a paragraph with <超链接 链接地址="https://example.com">a link</超链接>.</段落>
    <列表>
      <列表项>Item 1</列表项>
      <列表项>Item 2</列表项>
    </列表>
  </主体>
</超文本标记语言文档>
```

…translates to HTML that any browser can render:

```html
<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8"><title>My first HCML page</title></head>
  <body>
    <h1>Hello from HCML</h1>
    <p>This is a paragraph with <a href="https://example.com">a link</a>.</p>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </body>
</html>
```

## How to use

### 1. Call the API

```bash
# Convert a file with curl
curl -X POST https://hcml-api.rewp.de5.net/convert \
     -H 'Content-Type: text/plain;charset=utf-8' \
     --data-binary @example.hcml \
  > output.html

# Or from JavaScript
const html = await fetch("https://hcml-api.rewp.de5.net/convert", {
  method: "POST",
  headers: { "Content-Type": "text/plain;charset=utf-8" },
  body: "<超文本标记语言文档><主体><段落>Hi</段落></主体></超文本标记语言文档>",
}).then(r => r.text());
```

Response: `Content-Type: text/html; charset=utf-8`, open the file directly in a browser.

### 2. Drop-in standalone template (zero-setup)

Open **[template.html](https://hcml-api.rewp.de5.net/template.html)** → *Save as* from your browser →
edit the Chinese tags inside `<script type="application/hcml">…</script>` →
**double-click the saved file**. It will auto-fetch the HCML API and open the result in a new window.

### 3. Self-host your own Worker

HCML is a standard Cloudflare Workers project:

```bash
npm install
npx wrangler login

# edit wrangler.toml, fill in your account_id
npx wrangler deploy
```

## Rules of the language

- **Tag names** accept any Unicode letters/digits — so Chinese works naturally.
- **Void elements** (`img`, `br`, `hr`, `input`, ...) work with or without the closing slash.
- **Raw blocks** `<脚本>` / `<样式>` / `<noscript>` / `<textarea>` keep their inner content untouched.
- **Comments** `<!-- ... -->` are preserved verbatim.
- **Unknown Chinese tags** never break the page — they are downgraded to plain text
  (e.g. `&lt;未识别标签:某某&gt;`).
- **Attributes can also be written in Chinese** — see the full
  **[tag reference](./docs/tags.en.md)**.

## Where to find what

| Document | Chinese | English |
| --- | --- | --- |
| Project overview / quick start | [README.md](./README.md) | [README.en.md](./README.en.md) |
| Full tag & attribute reference | [docs/tags.zh-CN.md](./docs/tags.zh-CN.md) | [docs/tags.en.md](./docs/tags.en.md) |
| Worker API routes | [README.md](./README.md) | Below |

### Worker API routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/` | Playground page with online converter |
| `GET` | `/template.html`, `/hcml.html`, `/example.html` | Drop-in standalone HTML template |
| `GET` | `/health` | Health check |
| `POST` | `/convert` | **Main API** — body = HCML text → returns HTML |
| `PUT` / `PATCH` | `/convert` | Same as above |
| `GET` | `/convert?hcml=...` | Query-string alternative |
| Any body-bearing request to `/` | | Compatible — also converted |

## Where aliases are defined

All aliases live in **[`src/map.js`](./src/map.js)**.
Want to add a new Chinese alias? Just add an entry to `TAG_MAP` (or `ATTR_MAP` for attributes).

```js
// src/map.js
export const TAG_MAP = {
  "超文本标记语言文档": "html",   // This Chinese tag → <html>
  "网页根元素":        "html",   // Same HTML tag, another Chinese alias
  "头部":              "head",
  // ...
};
```

The reference docs in `docs/tags.*.md` are auto-generated from `src/map.js`.

## Directory layout

```
hcml/
├── src/
│   ├── index.js       # Cloudflare Workers fetch handler
│   ├── convert.js     # HCML ↔ HTML bidirectional converter
│   └── map.js         # Chinese ↔ English tag / attribute map
├── public/
│   └── template.html  # The drop-in standalone HTML template
├── docs/
│   ├── tags.zh-CN.md  # Tag reference (Chinese)
│   └── tags.en.md     # Tag reference (English)
├── wrangler.toml      # Cloudflare Workers config
├── package.json
└── README.md / README.en.md
```

## License

MIT
