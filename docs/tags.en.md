# HCML tag ↔ HTML tag reference

> This document lists every **Chinese tag name** and **Chinese attribute name** that
> HCML understands, alongside the English HTML tag / attribute it translates to.
> One HTML tag can have **multiple Chinese aliases** — they all mean the same thing.
> Unknown Chinese tags are rendered as plain text (so they never break the page).

## Table of contents

- [Document structure](#document-structure)
- [Sectioning & semantic](#sectioning-semantic)
- [Grouping & lists](#grouping-lists)
- [Inline text semantics](#inline-text-semantics)
- [Tables](#tables)
- [Forms](#forms)
- [Embedded content & media](#embedded-content-media)
- [Interactive & scripting](#interactive-scripting)
- [Obsolete (kept for compatibility)](#obsolete-kept-for-compatibility-)
- [Chinese attribute names](#chinese-attribute-names)

### Document structure (7)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <超文本标记语言文档> / <网页根元素> / <根元素> | `<html>` | 3 Chinese aliases supported |
| <头部> / <文档元信息> / <元信息区> | `<head>` | 3 Chinese aliases supported |
| <元信息> / <元数据> / <页面元> | `<meta>` | 3 Chinese aliases supported |
| <标题> / <文档标题> / <页签标题> | `<title>` | 3 Chinese aliases supported |
| <主体> / <页面主体> / <正文> | `<body>` | 3 Chinese aliases supported |
| <链接> / <外链> | `<link>` | 2 Chinese aliases supported |
| <基础路径> / <基准地址> | `<base>` | 2 Chinese aliases supported |

### Sectioning & semantic (13)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <页眉> / <页头> / <头部区域> | `<header>` | 3 Chinese aliases supported |
| <页脚> / <底部> / <底部区域> | `<footer>` | 3 Chinese aliases supported |
| <导航> / <导航栏> / <导航菜单> | `<nav>` | 3 Chinese aliases supported |
| <主内容> / <主要内容> / <主区> | `<main>` | 3 Chinese aliases supported |
| <章节> / <节> / <区块> / <分区> | `<section>` | 4 Chinese aliases supported |
| <文章> / <文章块> / <独立内容> | `<article>` | 3 Chinese aliases supported |
| <侧边栏> / <附加区> / <旁注> | `<aside>` | 3 Chinese aliases supported |
| <一级标题> / <最高级标题> / <大标题> | `<h1>` | 3 Chinese aliases supported |
| <二级标题> / <次高级标题> | `<h2>` | 2 Chinese aliases supported |
| <三级标题> / <中标题> | `<h3>` | 2 Chinese aliases supported |
| <四级标题> / <小标题> | `<h4>` | 2 Chinese aliases supported |
| <五级标题> / <超小标题> | `<h5>` | 2 Chinese aliases supported |
| <六级标题> | `<h6>` |  |

### Grouping & lists (13)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <块级容器> / <块容器> / <块> / <通用容器> | `<div>` | 4 Chinese aliases supported |
| <高亮区域> / <片段> / <行内分区> / <行内容器> / <内联容器> | `<span>` | 5 Chinese aliases supported |
| <段落> / <段落元素> | `<p>` | 2 Chinese aliases supported |
| <水平线> / <分隔线> | `<hr>` | 2 Chinese aliases supported |
| <换行> / <换行元素> | `<br>` | 2 Chinese aliases supported |
| <预格式化> / <预格式化文本> / <代码块> | `<pre>` | 3 Chinese aliases supported |
| <引用段落> / <块级引用> / <大引用> | `<blockquote>` | 3 Chinese aliases supported |
| <列表> / <无序列表> / <项目符号列表> | `<ul>` | 3 Chinese aliases supported |
| <数字列表> / <有序列表> | `<ol>` | 2 Chinese aliases supported |
| <列表项> / <条目> | `<li>` | 2 Chinese aliases supported |
| <定义列表> / <名词解释列表> | `<dl>` | 2 Chinese aliases supported |
| <定义项> / <名词> | `<dt>` | 2 Chinese aliases supported |
| <定义描述> / <描述> | `<dd>` | 2 Chinese aliases supported |

### Inline text semantics (27)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <超链接> / <链接标签> / <锚> / <锚点> | `<a>` | 4 Chinese aliases supported |
| <强调文字> / <强调文本> | `<em>` | 2 Chinese aliases supported |
| <重要> / <强调> / <强重点> | `<strong>` | 3 Chinese aliases supported |
| <粗体> / <加粗> / <粗体文字> / <加粗文字> | `<b>` | 4 Chinese aliases supported |
| <斜体> / <斜体字> | `<i>` | 2 Chinese aliases supported |
| <小号> / <小字> / <小字标签> | `<small>` | 3 Chinese aliases supported |
| <标记> / <高亮> / <荧光笔> | `<mark>` | 3 Chinese aliases supported |
| <插入> / <新增文本> | `<ins>` | 2 Chinese aliases supported |
| <删除> / <删除线> / <删除文字> | `<del>` | 3 Chinese aliases supported |
| <上标> / <上标文字> | `<sup>` | 2 Chinese aliases supported |
| <下标> / <下标文字> | `<sub>` | 2 Chinese aliases supported |
| <引用> / <引文> / <行内引用> | `<q>` | 3 Chinese aliases supported |
| <代码> / <代码行> | `<code>` | 2 Chinese aliases supported |
| <键盘> / <按键> / <键盘输入> | `<kbd>` | 3 Chinese aliases supported |
| <样本> / <示例输出> | `<samp>` | 2 Chinese aliases supported |
| <变量> / <变量名> | `<var>` | 2 Chinese aliases supported |
| <缩写> / <简称> | `<abbr>` | 2 Chinese aliases supported |
| <定义> / <术语> | `<dfn>` | 2 Chinese aliases supported |
| <时间> / <时间元素> | `<time>` | 2 Chinese aliases supported |
| <数据> / <元素数据> | `<data>` | 2 Chinese aliases supported |
| <重音> / <拼音重音> | `<ruby>` | 2 Chinese aliases supported |
| <注音> | `<rt>` |  |
| <注释> / <注音符号> | `<rp>` | 2 Chinese aliases supported |
| <方向覆盖> | `<bdi>` |  |
| <方向隔离> | `<bdo>` |  |
| <下划线> / <下划线文本> / <下划线标签> | `<u>` | 3 Chinese aliases supported |

### Tables (10)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <表格> / <表> | `<table>` | 2 Chinese aliases supported |
| <表格标题> / <表头标题> | `<caption>` | 2 Chinese aliases supported |
| <表格分组> / <列组> | `<colgroup>` | 2 Chinese aliases supported |
| <列> / <列元素> | `<col>` | 2 Chinese aliases supported |
| <表头> / <表头分组> | `<thead>` | 2 Chinese aliases supported |
| <表体> / <表体分组> | `<tbody>` | 2 Chinese aliases supported |
| <表尾> / <表尾分组> | `<tfoot>` | 2 Chinese aliases supported |
| <表格行> / <行> | `<tr>` | 2 Chinese aliases supported |
| <表头单元格> / <表头项> / <表头列> | `<th>` | 3 Chinese aliases supported |
| <表格单元格> / <单元格> / <数据单元格> | `<td>` | 3 Chinese aliases supported |

### Forms (13)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <表单> / <表单标签> | `<form>` | 2 Chinese aliases supported |
| <输入> / <输入框> / <输入控件> | `<input>` | 3 Chinese aliases supported |
| <文本域> / <多行文本> | `<textarea>` | 2 Chinese aliases supported |
| <按钮> / <按钮标签> | `<button>` | 2 Chinese aliases supported |
| <下拉框> / <选择框> / <下拉选择> | `<select>` | 3 Chinese aliases supported |
| <选项> / <下拉项> / <选项项> | `<option>` | 3 Chinese aliases supported |
| <选项组> / <选项分组> | `<optgroup>` | 2 Chinese aliases supported |
| <标签> / <文本标签> / <字段标签> | `<label>` | 3 Chinese aliases supported |
| <字段集> / <分组> / <表单分组> | `<fieldset>` | 3 Chinese aliases supported |
| <字段集标题> / <分组标题> / <图例> | `<legend>` | 3 Chinese aliases supported |
| <输出> / <表单输出> | `<output>` | 2 Chinese aliases supported |
| <度量> / <计量器> | `<meter>` | 2 Chinese aliases supported |
| <进度> / <进度条> | `<progress>` | 2 Chinese aliases supported |

### Embedded content & media (15)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <图像> / <图片> / <图片标签> / <图片元素> | `<img>` | 4 Chinese aliases supported |
| <媒体源> / <来源> / <资源来源> | `<source>` | 3 Chinese aliases supported |
| <图片映射> / <热区图> | `<map>` | 2 Chinese aliases supported |
| <映射区> / <热区> | `<area>` | 2 Chinese aliases supported |
| <内联框架> / <框架页> | `<iframe>` | 2 Chinese aliases supported |
| <嵌入对象> / <嵌入> | `<embed>` | 2 Chinese aliases supported |
| <对象> / <对象元素> | `<object>` | 2 Chinese aliases supported |
| <对象参数> / <参数> | `<param>` | 2 Chinese aliases supported |
| <视频> / <视频元素> | `<video>` | 2 Chinese aliases supported |
| <音频> / <音频元素> | `<audio>` | 2 Chinese aliases supported |
| <轨道> / <字幕轨道> / <字幕> | `<track>` | 3 Chinese aliases supported |
| <画布> / <画布元素> | `<canvas>` | 2 Chinese aliases supported |
| <可缩放矢量图形> / <矢量图> | `<svg>` | 2 Chinese aliases supported |
| <数学> / <数学公式> | `<math>` | 2 Chinese aliases supported |

### Interactive & scripting (8)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <详情> / <可折叠详情> | `<details>` | 2 Chinese aliases supported |
| <概要> / <摘要> / <折叠标题> | `<summary>` | 3 Chinese aliases supported |
| <对话> / <弹窗> | `<dialog>` | 2 Chinese aliases supported |
| <模板> / <模板元素> | `<template>` | 2 Chinese aliases supported |
| <插槽> / <占位插槽> | `<slot>` | 2 Chinese aliases supported |
| <脚本> / <脚本代码> | `<script>` | 2 Chinese aliases supported |
| <样式> / <样式表> / <样式代码> | `<style>` | 3 Chinese aliases supported |

### Obsolete (kept for compatibility) (11)

| Chinese aliases | HTML tag | 说明 |
|---|---|---|
| <字体> | `<font>` |  |
| <中心> / <居中> | `<center>` | 2 Chinese aliases supported |
| <等宽> / <打字机> | `<tt>` | 2 Chinese aliases supported |
| <大字> | `<big>` |  |
| <列表目录> | `<dir>` |  |
| <菜单> | `<menu>` |  |
| <框架集> | `<frameset>` |  |
| <框架> | `<frame>` |  |
| <无框架> | `<noframes>` |  |
| <滚动> | `<marquee>` |  |
| <闪烁> | `<blink>` |  |

## Chinese attribute names

You can also use Chinese attributes on HCML tags (e.g. `<图片 源="x.png" 替代文本="示意图">`). All aliases are listed below.

| Chinese attribute names | HTML 属性 |
|---|---|
| `缩写` | `abbr` |
| `接受` | `accept` |
| `提交` | `action` |
| `对齐` | `align` |
| `允许` | `allow` |
| `允许全屏` / `允许全屏值` | `allowfullscreen` |
| `替代文本` / `说明` | `alt` |
| `异步` | `async` |
| `自动完成` / `自动完成值` | `autocomplete` |
| `自动聚焦` / `自动聚焦值` | `autofocus` |
| `自动播放` / `自动播放值` | `autoplay` |
| `轴` | `axis` |
| `行为` | `behavior` |
| `边框` | `border` |
| `单元格内边距` | `cellpadding` |
| `单元格间距` | `cellspacing` |
| `字符集` / `字符编码` / `字符集值` | `charset` |
| `已检查` | `checked` |
| `类` / `类名` | `class` |
| `列数` | `cols` |
| `跨列` | `colspan` |
| `紧凑` | `compact` |
| `内容` | `content` |
| `可编辑` | `contenteditable` |
| `控制条` / `控制` | `controls` |
| `跨域` / `跨域值` | `crossorigin` |
| `数据` | `data` |
| `默认` | `default` |
| `方向` | `direction` |
| `禁用` | `disabled` |
| `编码类型` | `enctype` |
| `表单提交` | `formaction` |
| `表单方法` | `formmethod` |
| `表单不验证` | `formnovalidate` |
| `表单目标` | `formtarget` |
| `表头关联` | `headers` |
| `高度` / `画布高度` | `height` |
| `可隐藏` | `hidden` |
| `链接地址` / `链接` / `跳转` / `资源` / `外部资源` | `href` |
| `http等效` | `http-equiv` |
| `标识` / `编号` | `id` |
| `安全` | `integrity` |
| `引用` | `itemref` |
| `标签` / `轨道标签` | `label` |
| `语言` | `lang` |
| `长度` | `length` |
| `列表` | `list` |
| `加载` | `loading` |
| `循环播放` / `循环` | `loop` |
| `最大值` | `max` |
| `最大长度` | `maxlength` |
| `媒体` | `media` |
| `方法` | `method` |
| `最小值` | `min` |
| `最小长度` | `minlength` |
| `多行` / `允许多选` | `multiple` |
| `静音` | `muted` |
| `名称` / `元数据名` / `元名称` / `参数名` | `name` |
| `可验证` / `已验证` | `novalidate` |
| `打开` | `open` |
| `模式` | `pattern` |
| `占位符` | `placeholder` |
| `播放速率` | `playbackrate` |
| `海报` | `poster` |
| `预加载` | `preload` |
| `只读` / `只读值` | `readonly` |
| `来源策略` | `referrerpolicy` |
| `关系` / `相对关系` / `关联` | `rel` |
| `必需` | `required` |
| `顺序值` | `reversed` |
| `行数` | `rows` |
| `跨行` | `rowspan` |
| `范围` | `scope` |
| `速度` | `scrollamount` |
| `延迟` | `scrolldelay` |
| `选中` / `默认选中` | `selected` |
| `长度值` / `尺寸值` | `size` |
| `尺寸` / `大小` | `sizes` |
| `列跨度` / `列跨度值` / `跨度` | `span` |
| `拼写检查` | `spellcheck` |
| `源` / `图片源` / `文件` / `地址` / `嵌入源` | `src` |
| `字幕语言` / `字幕语言值` | `srclang` |
| `图像集` | `srcset` |
| `开始` | `start` |
| `步长` | `step` |
| `样式` | `style` |
| `索引` | `tabindex` |
| `目标` / `目标页面` | `target` |
| `标题` | `title` |
| `类型` / `类型值` / `类型按钮` / `类型按钮值` / `模块` / `内联` / `资源类型` / `类型数字` / `媒体类型` | `type` |
| `值` / `参数值` | `value` |
| `宽度` / `画布宽度` | `width` |
| `换行` | `wrap` |

## Source

This document is auto-generated from [src/map.js](./src/map.js). Edit that file to add new aliases.
