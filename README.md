# HCML —— 中文 HTML 标记语言

> 把 HTML 的**所有**标签换成中文（一种标签可能有多个中文别名），
> 部署在 **Cloudflare Workers** 上，向 Worker 发送请求即可把 `.hcml` 翻译成标准 HTML。

## 快速上手

### 1. 安装与登录

```bash
npm install
npx wrangler login        # 登录 Cloudflare
```

### 2. 开发调试

```bash
npx wrangler dev          # 本地运行，默认监听 http://localhost:8787
```

### 3. 部署到 Cloudflare Workers

编辑 `wrangler.toml`，填入你的 `account_id` 后：

```bash
npx wrangler deploy
```

Worker 上线后，向它发送请求即可：

```bash
# 推荐：POST 到固定 API 路径
curl -X POST https://your-worker.example.com/convert \
     -H 'Content-Type: text/plain' \
     --data-binary @example.hcml

# 兼容写法（旧版仍支持）
curl -X POST https://your-worker.example.com/ \
     -H 'Content-Type: text/plain' \
     --data-binary @example.hcml
```

返回的就是浏览器可以直接渲染的 HTML，`Content-Type: text/html; charset=utf-8`。

## HCML 示例

```xml
<文档类型声明>
<超文本标记语言文档>
  <头部>
    <标题>HCML 示例</标题>
  </头部>
  <主体>
    <一级标题>欢迎使用 HCML</一级标题>
    <段落>这是一段中文 <超链接 href="https://example.com">超链接</超链接>。</段落>
    <图片 src="pic.png" />
    <粗体>重要</粗体>
  </主体>
</超文本标记语言文档>
```

会被转换为：

```html
<!DOCTYPE html>
<html>
  <head><meta charset="UTF-8"><title>HCML 示例</title></head>
  <body>
    <h1>欢迎使用 HCML</h1>
    <p>这是一段中文 <a href="https://example.com">超链接</a>。</p>
    <img src="pic.png">
    <b>重要</b>
  </body>
</html>
```

## API

**推荐走 `/convert`。** 旧客户端 POST `/` 也能被正确转换（不会再被首页吞）。

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/` | 返回首页（含在线转换器 UI） |
| `GET` | `/health` | 健康检查 |
| `POST` | `/convert` | body 为 `.hcml` 文本，返回 HTML（⭐ 主 API） |
| `PUT` / `PATCH` | `/convert` | 同上 |
| `GET` | `/convert?hcml=...` | 查询参数形式 |
| 任意 | `/` 带 body | 兼容旧客户端（自动走转换器） |
| 任意 | `/anything.hcml` | 路径以 `.hcml` 结尾时同样触发转换 |

> **为什么 `/convert`？** 之前首页和转换器共用同一个路径 `/`，首页里的 JS 在线按钮
> `fetch(location.pathname, {method:"POST", body:...})` 发起 POST 回自己时，Worker
> 因 `pathname === "/"` 直接返回首页源码，导致用户看到的"转换结果"其实是首页 HTML。
> 固定到 `/convert` 后，API 永远不会被首页路由误伤。

## 语言规则

- **标签名**支持任意 Unicode 字母/数字，中文当然可以。
- **空元素**（`img` / `br` / `hr` / `input` ...）写成 `<图片 src="x" />` 或 `<图片 src="x">` 都能识别。
- **原始块** `<脚本>` / `<样式>` / `<noscript>` / `<textarea>` 的内部内容**保持原样**，不会被当成标签。
- **注释** `<!-- ... -->` 会被保留。
- **未知中文标签**不会破坏 HTML 结构，而是被写成普通文本（例如 `<未识别标签:某某>`）。

## 映射表

详见 [`src/map.js`](./src/map.js)。要增加/调整中文别名，直接在对象里加键值对即可。

```js
export const TAG_MAP = {
  // 中文别名: 小写 HTML 标签名
  "超文本标记语言文档": "html",
  "网页根元素":        "html",      // 同一个英文标签可以有多个中文别名
  "头部":              "head",
  "文档元信息":        "head",
  // ...
};
```

反向查找表 `EN_TO_ZH` 自动生成，用于 HTML → HCML 方向。

## 目录结构

```
hcml/
├── src/
│   ├── index.js       # Worker 入口（fetch handler）
│   ├── convert.js     # HCML <-> HTML 双向转换器
│   └── map.js         # 中文 ↔ 英文 标签映射表
├── wrangler.toml      # Cloudflare Workers 配置
└── package.json
```

## License

MIT
