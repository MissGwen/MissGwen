### 一、盒模型与视觉渲染

1. **标准盒模型与 IE 盒模型的区别**

   - 标准盒模型：`width/height` 仅包含内容区（`content-box`），内边距（`padding`）和边框（`border`）需额外计算。
   - IE 盒模型（怪异盒模型）：`width/height` 包含内容+内边距+边框（`border-box`），通过 `box-sizing` 属性切换。
   - **场景应用**：全局设置 `box-sizing: border-box` 避免布局计算偏差，尤其在响应式布局中。

2. **BFC（块级格式化上下文）的原理与应用**

   - 触发条件：浮动元素、`overflow` 非 `visible`、`display: inline-block` 等。
   - 作用：隔离布局，解决浮动元素高度塌陷、外边距重叠等问题。
   - **案例**：清除浮动可通过给父元素设置 `overflow: hidden` 触发 BFC。

3. **层叠上下文（Stacking Context）**
   - 形成条件：定位元素（`position: relative/absolute/fixed`）且 `z-index` 非 `auto`，`opacity < 1`，`transform` 非 `none` 等。
   - 层叠顺序：背景和边框 < 浮动/定位元素 < 表单元素 < `z-index` 更高的元素。
   - **问题**：为什么定位元素设置 `z-index` 无效？可能因未形成层叠上下文，需父级元素同步触发。

### 二、布局与响应式设计

1. **Flexbox 与 Grid 的对比及场景选择**

   - Flexbox：一维布局（单行/单列），适合弹性分布、对齐（如导航栏、卡片列表）。
   - Grid：二维布局（行列系统），适合复杂网格结构（如电商列表、仪表盘）。
   - **高级技巧**：`flex-shrink` 负值强制换行、Grid `minmax()` 动态轨道大小。

2. **垂直居中的 N 种实现方式**

   - 传统方案：
     - 绝对定位 + `transform: translate(-50%, -50%)`
     - `table-cell` + `vertical-align: middle`
   - 现代方案：
     - Flexbox `align-items: center` + `justify-content: center`
     - Grid `place-items: center`
   - **注意**：需考虑元素是否定高、内容动态变化的场景。

3. **响应式布局核心策略**
   - 媒体查询（`@media`）：按视口宽度切换样式，如 `max-width: 768px` 适配移动端。
   - 流体布局：使用百分比、`vw/vh`、`calc()` 实现弹性容器。
   - 容器查询（Container Queries）：未来标准，基于父容器尺寸响应（目前需实验特性）。
   - **案例**：如何让图片在小屏设备自动缩放？`img { max-width: 100%; height: auto; }`

### 三、性能优化与渲染机制

1. **CSS 阻塞渲染的原理与优化**

   - 浏览器解析 HTML 时，遇到 `<link rel="stylesheet">` 会暂停渲染，优先下载 CSS 构建渲染树。
   - **优化手段**：
     - 内联关键 CSS（首屏渲染所需样式），异步加载非关键 CSS（`media="print"` 配合 `onload` 切换）。
     - 使用 `preload` 预加载 CSS，避免阻塞其他资源。

2. **重排（回流）与重绘的优化**

   - 重排：影响布局（如修改 `width`、`height`、`padding`），开销较大。
   - 重绘：仅影响外观（如 `color`、`background`），开销较小。
   - **最佳实践**：
     - 批量修改样式（使用 `class` 替代内联样式）。
     - 动画元素使用 `transform` 和 `opacity`（脱离文档流，触发合成层）。
     - 避免频繁访问布局属性（如 `offsetWidth`、`getBoundingClientRect()`）。

3. **CSS 选择器性能优化**
   - 浏览器从右向左解析选择器，应避免深层嵌套（如 `div div div a`）。
   - 优先使用类名/ID 选择器，避免通配符（`*`）和标签+类组合（`div.box`）。
   - **工具**：使用 CSSOM 分析工具（如 Chrome DevTools 的 Coverage）检测未使用样式。

### 四、兼容性与工程化

1. **CSS 前缀处理与 Autoprefixer**

   - 常见前缀：`-webkit-`（Chrome/Safari）、`-moz-`（Firefox）、`-ms-`（IE）。
   - 自动化方案：通过 PostCSS + Autoprefixer 自动添加前缀，配置 `browserslist` 指定目标浏览器。
   - **问题**：为什么某些新属性（如 `backdrop-filter`）仍需前缀？因浏览器实现进度不同，需渐进增强。

2. **IE 兼容性问题解决方案**

   - Flexbox 兼容：IE11 需添加 `-ms-flex` 前缀，且不支持 `flex-grow` 负值。
   - 圆角与阴影：IE9 不支持 `border-radius` 和 `box-shadow`，需降级方案（图片替代或放弃支持）。
   - 透明度：IE8 及以下使用 `filter: alpha(opacity=50)`，现代浏览器用 `opacity: 0.5`。

3. **CSS 预处理器与后处理器**
   - Sass/Less：变量、Mixin、嵌套语法提升复用性，如 `@mixin clearfix` 清除浮动。
   - PostCSS：插件生态丰富（如 `postcss-preset-env` 转换现代 CSS，`cssnano` 压缩代码）。
   - **对比**：预处理器在编译时处理，后处理器在编译后处理，可结合使用（如 Vue CLI 中 Sass + PostCSS）。

### 五、动画与视觉效果

1. **CSS 动画性能优化**

   - 优先使用 `transform`（平移/旋转）和 `opacity`（透明度），避免触发重排/重绘。
   - `will-change` 属性提示浏览器优化渲染（如 `will-change: transform`），但需谨慎使用（过度使用会消耗内存）。
   - **案例**：实现流畅的卡片悬停动画，使用 `transition: transform 0.3s ease-out`。

2. **自定义属性（CSS Variables）的应用**

   - 定义：`--primary-color: #2196F3;`
   - 使用：`color: var(--primary-color);`
   - **优势**：全局主题切换（通过 JS 修改根元素变量）、动态计算（`calc(100% - var(--spacing))`）。
   - **兼容性**：IE 不支持，需搭配 PostCSS 插件（如 `postcss-custom-properties`）做降级。

3. **混合模式（Blend Modes）与滤镜（Filters）**
   - 混合模式：`mix-blend-mode: screen` 实现图片融合效果，常用于毛玻璃特效。
   - 滤镜：`filter: blur(5px)` 高斯模糊，`backdrop-filter: blur(5px)` 背景模糊（需配合 `overflow: hidden`）。
   - **注意**：滤镜对性能有影响，复杂场景建议用 Canvas 或 SVG 实现。

### 六、无障碍与用户体验

1. **色彩对比度与可访问性**

   - 文本与背景对比度需至少 4.5:1（WCAG 标准），可通过工具（如 WebAIM Contrast Checker）检测。
   - 避免仅通过颜色传达信息（如红色边框+提示文字），确保色盲用户可感知。

2. **焦点样式与键盘导航**

   - 禁止全局移除 `outline`（`outline: none`），需自定义样式（如 `outline: 2px solid #2196F3`）。
   - 确保所有交互元素（按钮、链接、表单控件）可通过键盘聚焦（`tabindex` 属性）。

3. **暗黑模式的 CSS 实现**
   - 媒体查询：`@media (prefers-color-scheme: dark)` 适配系统设置。
   - 动态切换：通过 JS 切换根元素类名，修改全局变量（如 `html.dark { --bg-color: #1a1a1a; }`）。

### 七、前沿技术与复杂场景

1. **CSS Houdini 是什么？解决什么问题？**

   - 一组底层 API，允许 JS 修改 CSS 引擎的渲染流程（如自定义布局、动画）。
   - **应用场景**：实现复杂动画（如流体形状）、自定义属性解析（替代预处理器）。
   - **现状**：浏览器支持有限，多用于实验性项目。

2. **容器查询（Container Queries）的使用**

   - 语法：`@container (max-width: 600px) { ... }`，基于父容器尺寸应用样式。
   - **优势**：替代多层媒体查询，组件内部响应式更灵活。
   - **兼容性**：需开启实验特性（Chrome Canary 启用 `#enable-container-queries` 标志）。

3. **实现自适应字体大小（流体字体）**
   - 方案：`font-size: clamp(1.125rem, 2vw, 1.5rem)`，结合 `clamp()` 函数限制范围。
   - 进阶：使用 `vw` 单位配合媒体查询，避免小屏字体过大。

### 八、高频细节问题

1. **选择器优先级计算规则**

   - 权重：`!important` > 内联样式（1000）> ID 选择器（100）> 类/属性/伪类（10）> 标签/伪元素（1）。
   - **案例**：`#header .nav-item`（100+10=110） vs `.header .nav-item.active`（10+10+10=30），前者优先级更高。

2. **伪类与伪元素的区别**

   - 伪类：用于选中状态（`:hover`、`:active`），单冒号（如 `a:hover`）。
   - 伪元素：创建虚拟元素（`::before`、`::after`），双冒号（CSS3 规范），需配合 `content` 属性。

3. **CSS 中 `visibility: hidden` 与 `display: none` 的区别**
   - `visibility: hidden`：元素占位，不可见但仍参与布局（重绘，不重排）。
   - `display: none`：元素完全移除，不占位（触发重排）。

### 九、总结与备考建议

1. **核心考察点**

   - 深入理解布局原理（Flex/Grid/BFC/层叠上下文）。
   - 性能优化的实际案例（如动画优化、阻塞资源处理）。
   - 兼容性方案与工程化工具（Autoprefixer/PostCSS）的落地经验。

2. **学习资源**

   - MDN：CSS 规范与属性详解。
   - CSS-Tricks：现代布局与前沿技术教程。
   - Chrome DevTools：性能面板分析重排重绘，Coverage 检测未使用样式。

3. **面试技巧**
   - 结合项目场景回答（如“在某个大屏项目中，我们使用 Grid 实现了动态瀑布流布局”）。
   - 展示调试思路（如“遇到样式不生效时，先用浏览器 DevTools 检查选择器优先级和层叠顺序”）。
