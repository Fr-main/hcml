// HCML 中文标签 -> HTML 英文标签的映射表
// 一个英文标签可以对应多个中文标签（同义别名）
// 键必须是字符串；值是小写的 HTML 标签名或特殊标记
//
// 若要新增中文标签，只需在下面对象里继续添加键值对即可。

export const TAG_MAP = {
  // ============= 文档结构 / 根节点 =============
  "超文本标记语言文档": "html",
  "网页根元素": "html",
  "根元素": "html",

  "头部": "head",
  "文档元信息": "head",
  "元信息区": "head",

  "标题": "title",
  "文档标题": "title",
  "页签标题": "title",

  "主体": "body",
  "页面主体": "body",
  "正文": "body",

  "段落": "p",
  "段落元素": "p",

  "换行": "br",
  "换行元素": "br",

  "水平线": "hr",
  "分隔线": "hr",

  "注释": "comment", // 仅用于保留，转换时会特殊处理
  "脚本": "script",
  "脚本代码": "script",
  "样式": "style",
  "样式表": "style",
  "样式代码": "style",

  // ============= 元数据 / <meta> =============
  "元信息": "meta",
  "元数据": "meta",
  "页面元": "meta",

  "链接": "link",
  "外链": "link",

  "基础路径": "base",
  "基准地址": "base",

  // ============= 语义化区块 =============
  "页眉": "header",
  "页头": "header",
  "头部区域": "header",

  "页脚": "footer",
  "底部": "footer",
  "底部区域": "footer",

  "导航": "nav",
  "导航栏": "nav",
  "导航菜单": "nav",

  "主内容": "main",
  "主要内容": "main",
  "主区": "main",

  "章节": "section",
  "节": "section",
  "区块": "section",
  "分区": "section",

  "文章": "article",
  "文章块": "article",
  "独立内容": "article",

  "侧边栏": "aside",
  "附加区": "aside",
  "旁注": "aside",

  "详情": "details",
  "可折叠详情": "details",

  "概要": "summary",
  "摘要": "summary",
  "折叠标题": "summary",

  "对话": "dialog",
  "弹窗": "dialog",

  "数据": "data",
  "元素数据": "data",
  "进度": "progress",
  "进度条": "progress",
  "度量": "meter",
  "计量器": "meter",
  "时间": "time",
  "时间元素": "time",

  // ============= 层级标题 h1 ~ h6 =============
  "一级标题": "h1",
  "最高级标题": "h1",
  "大标题": "h1",

  "二级标题": "h2",
  "次高级标题": "h2",

  "三级标题": "h3",
  "中标题": "h3",

  "四级标题": "h4",
  "小标题": "h4",

  "五级标题": "h5",
  "超小标题": "h5",

  "六级标题": "h6",

  // ============= 文本语义 / 行内 =============
  "粗体": "b",
  "加粗": "b",
  "粗体文字": "b",

  "重要": "strong",
  "强调": "strong",
  "强重点": "strong",

  "斜体": "i",
  "斜体字": "i",

  "强调文字": "em",
  "强调文本": "em",

  "小号": "small",
  "小字": "small",

  "删除": "del",
  "删除线": "del",
  "删除文字": "del",

  "插入": "ins",
  "下划线": "ins",
  "新增文本": "ins",

  "标记": "mark",
  "高亮": "mark",
  "荧光笔": "mark",

  "上标": "sup",
  "上标文字": "sup",

  "下标": "sub",
  "下标文字": "sub",

  "引用": "q",
  "引文": "q",
  "行内引用": "q",

  "代码": "code",
  "代码行": "code",

  "变量": "var",
  "变量名": "var",

  "键盘": "kbd",
  "按键": "kbd",
  "键盘输入": "kbd",

  "样本": "samp",
  "示例输出": "samp",

  "缩写": "abbr",
  "简称": "abbr",

  "定义": "dfn",
  "术语": "dfn",

  "重音": "ruby",
  "拼音重音": "ruby",
  "注音": "rt",

  "注释": "rp",
  "注音符号": "rp",

  "方向覆盖": "bdi",
  "方向隔离": "bdo",

  "高亮区域": "span",
  "片段": "span",
  "行内分区": "span",

  "下划线文本": "u",
  "下划线标签": "u",
  "下划线": "u",

  "引用段落": "blockquote",
  "块级引用": "blockquote",
  "大引用": "blockquote",

  "预格式化": "pre",
  "预格式化文本": "pre",
  "代码块": "pre",

  "地址": "address",
  "联系信息": "address",

  // ============= 链接 =============
  "超链接": "a",
  "链接标签": "a",
  "锚": "a",
  "锚点": "a",

  // ============= 列表 =============
  "列表": "ul",                  // 简写：默认视为无序列表
  "无序列表": "ul",
  "项目符号列表": "ul",

  "数字列表": "ol",
  "有序列表": "ol",

  "列表项": "li",
  "条目": "li",

  "定义列表": "dl",
  "名词解释列表": "dl",

  "定义项": "dt",
  "名词": "dt",

  "定义描述": "dd",
  "描述": "dd",

  // ============= 表格 =============
  "表格": "table",
  "表": "table",

  "表格标题": "caption",
  "表头标题": "caption",

  "表格分组": "colgroup",
  "列组": "colgroup",

  "列": "col",
  "列元素": "col",

  "表头": "thead",
  "表头分组": "thead",

  "表体": "tbody",
  "表体分组": "tbody",

  "表尾": "tfoot",
  "表尾分组": "tfoot",

  "表格行": "tr",
  "行": "tr",

  "表头单元格": "th",
  "表头项": "th",
  "表头列": "th",

  "表格单元格": "td",
  "单元格": "td",
  "数据单元格": "td",

  // ============= 表单 =============
  "表单": "form",
  "表单标签": "form",

  "输入": "input",
  "输入框": "input",
  "输入控件": "input",

  "文本域": "textarea",
  "多行文本": "textarea",

  "按钮": "button",
  "按钮标签": "button",

  "标签": "label",
  "文本标签": "label",
  "字段标签": "label",

  "字段集": "fieldset",
  "分组": "fieldset",
  "表单分组": "fieldset",

  "字段集标题": "legend",
  "分组标题": "legend",
  "图例": "legend",

  "下拉框": "select",
  "选择框": "select",
  "下拉选择": "select",

  "选项": "option",
  "下拉项": "option",
  "选项项": "option",

  "选项组": "optgroup",
  "选项分组": "optgroup",

  "输出": "output",
  "表单输出": "output",

  // ============= 嵌入 / 媒体 =============
  "图像": "img",
  "图片": "img",
  "图片标签": "img",
  "图片元素": "img",

  "图片映射": "map",
  "热区图": "map",

  "映射区": "area",
  "热区": "area",

  "内联框架": "iframe",
  "框架页": "iframe",

  "嵌入对象": "embed",
  "嵌入": "embed",

  "对象": "object",
  "对象元素": "object",

  "对象参数": "param",
  "参数": "param",

  "音频": "audio",
  "音频元素": "audio",

  "视频": "video",
  "视频元素": "video",

  "媒体源": "source",
  "来源": "source",
  "资源来源": "source",

  "轨道": "track",
  "字幕轨道": "track",
  "字幕": "track",

  "画布": "canvas",
  "画布元素": "canvas",

  "可缩放矢量图形": "svg",
  "矢量图": "svg",

  "数学": "math",
  "数学公式": "math",

  // ============= 容器 =============
  "块级容器": "div",
  "块容器": "div",
  "块": "div",
  "通用容器": "div",

  "行内容器": "span",
  "内联容器": "span",

  // ============= 过时标签（保留语义映射） =============
  "字体": "font",
  "中心": "center",
  "居中": "center",
  "加粗文字": "b",
  "等宽": "tt",
  "打字机": "tt",
  "大字": "big",
  "小字标签": "small",
  "框架集": "frameset",
  "框架": "frame",
  "无框架": "noframes",
  "闪烁": "blink",
  "滚动": "marquee",
  "列表目录": "dir",
  "菜单": "menu",

  // ============= 自定义标签 / 其它 =============
  "模板": "template",
  "模板元素": "template",

  "插槽": "slot",
  "占位插槽": "slot",
};

// 反向查找：英文标签名 -> 任意一个中文别名（用于 HTML -> HCML 方向）
// 取 TAG_MAP 中第一个遇到的别名作为代表名。
const reverse = {};
for (const zh of Object.keys(TAG_MAP)) {
  const en = TAG_MAP[zh];
  if (!reverse[en]) reverse[en] = zh;
}
export const EN_TO_ZH = reverse;

// HTML void 元素（没有闭合标签）
export const VOID_ELEMENTS = new Set([
  "area", "base", "br", "col", "embed", "hr", "img",
  "input", "link", "meta", "param", "source", "track", "wbr",
]);

// 必须保持原样的 raw 文本元素
export const RAW_ELEMENTS = new Set(["script", "style", "noscript"]);

// ============= 中文属性名 -> 英文属性名 =============
// HCML 标签上可以写中文属性（例如 <图片 源="x.png" 替代文本="示意图" />）
// 转换时会把它们翻译成标准的 HTML 属性名。
// 未在本表里出现的属性将被原样保留（HTML 支持任意 data-* 与自定义属性）。

export const ATTR_MAP = {
  // 通用 / 全局
  "类": "class",
  "类名": "class",
  "标识": "id",
  "编号": "id",
  "样式": "style",
  "标题": "title",
  "语言": "lang",
  "可隐藏": "hidden",
  "数据": "data",
  "可编辑": "contenteditable",
  "拼写检查": "spellcheck",
  "索引": "tabindex",
  "自动聚焦": "autofocus",
  "引用": "itemref",
  "类型": "type",
  "值": "value",
  "名称": "name",
  "只读": "readonly",
  "禁用": "disabled",
  "已检查": "checked",
  "选中": "selected",
  "必需": "required",
  "占位符": "placeholder",
  "最小值": "min",
  "最大值": "max",
  "步长": "step",
  "长度": "length",
  "长度值": "size",
  "宽度": "width",
  "高度": "height",

  // <a>
  "链接地址": "href",
  "链接": "href",
  "跳转": "href",
  "目标": "target",
  "关系": "rel",
  "相对关系": "rel",
  "资源": "href",

  // <img> / <source> / <audio> / <video> / <iframe> / <embed> / <frame>
  "源": "src",
  "图片源": "src",
  "文件": "src",
  "地址": "src",
  "嵌入源": "src",
  "替代文本": "alt",
  "说明": "alt",
  "图像集": "srcset",
  "尺寸": "sizes",

  // <meta>
  "元数据名": "name",
  "元名称": "name",
  "内容": "content",
  "字符集": "charset",
  "字符编码": "charset",
  "http等效": "http-equiv",

  // <link>
  "关联": "rel",
  "外部资源": "href",
  "类型值": "type",

  // <form>
  "方法": "method",
  "提交": "action",
  "编码类型": "enctype",
  "自动完成": "autocomplete",
  "目标页面": "target",
  "可验证": "novalidate",
  "已验证": "novalidate",

  // <input>
  "接受": "accept",
  "自动完成值": "autocomplete",
  "自动聚焦值": "autofocus",
  "列表": "list",
  "最小长度": "minlength",
  "最大长度": "maxlength",
  "多行": "multiple",
  "模式": "pattern",
  "只读值": "readonly",
  "尺寸值": "size",

  // <textarea>
  "行数": "rows",
  "列数": "cols",
  "换行": "wrap",

  // <button>
  "类型按钮": "type",
  "类型按钮值": "type",
  "表单提交": "formaction",
  "表单方法": "formmethod",
  "表单不验证": "formnovalidate",
  "表单目标": "formtarget",

  // <select> / <option> / <optgroup>
  "允许多选": "multiple",
  "标签": "label",
  "默认选中": "selected",

  // <video> / <audio>
  "自动播放": "autoplay",
  "自动播放值": "autoplay",
  "循环播放": "loop",
  "静音": "muted",
  "预加载": "preload",
  "控制条": "controls",
  "控制": "controls",
  "海报": "poster",
  "播放速率": "playbackrate",

  // <iframe>
  "允许": "allow",
  "允许全屏": "allowfullscreen",
  "允许全屏值": "allowfullscreen",
  "加载": "loading",
  "来源策略": "referrerpolicy",

  // <script> / <style> / <link>
  "异步": "async",
  "延迟": "defer",
  "模块": "type",          // type="module" 等
  "内联": "type",
  "字符集值": "charset",
  "安全": "integrity",
  "跨域": "crossorigin",
  "跨域值": "crossorigin",

  // <picture> / <source>
  "媒体": "media",
  "资源类型": "type",

  // <col> / <colgroup> / <table>
  "列跨度": "span",
  "列跨度值": "span",
  "跨度": "span",
  "边框": "border",
  "单元格间距": "cellspacing",
  "单元格内边距": "cellpadding",
  "对齐": "align",

  // <td> / <th>
  "跨行": "rowspan",
  "跨列": "colspan",
  "表头关联": "headers",
  "范围": "scope",
  "缩写": "abbr",
  "轴": "axis",

  // <ol>
  "开始": "start",
  "顺序值": "reversed",
  "类型数字": "type",

  // <li>
  "值": "value",

  // <ul>
  "紧凑": "compact",

  // <canvas>
  "画布宽度": "width",
  "画布高度": "height",

  // <details>
  "打开": "open",

  // <marquee>（过时但仍映射）
  "行为": "behavior",
  "方向": "direction",
  "循环": "loop",
  "速度": "scrollamount",
  "延迟": "scrolldelay",

  // <param>
  "参数名": "name",
  "参数值": "value",

  // <track>
  "默认": "default",
  "字幕语言": "srclang",
  "字幕语言值": "srclang",
  "轨道标签": "label",

  // <source>
  "大小": "sizes",
  "媒体类型": "type",
};

// 反向：英文属性 -> 中文别名
const attrReverse = {};
for (const zh of Object.keys(ATTR_MAP)) {
  const en = ATTR_MAP[zh];
  if (!attrReverse[en]) attrReverse[en] = zh;
}
export const EN_ATTR_TO_ZH = attrReverse;
