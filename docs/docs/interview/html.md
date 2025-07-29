### 一、HTML5 核心特性与 API

1. **语义化标签的实际应用**

   - 如何选择 `<header>`、`<nav>`、`<article>`、`<section>`、`<aside>`、`<footer>` 等标签构建页面结构？  
     需结合具体场景说明，例如：`header` 用于页面头部或章节标题，`article` 包裹独立内容（如博客文章），`aside` 放置侧边栏附属信息。
   - 语义化对 SEO 和无障碍访问的具体影响是什么？  
     搜索引擎爬虫依赖标签权重识别内容，屏幕阅读器通过语义标签精准朗读页面，提升可访问性。

2. **HTML5 多媒体与图形 API**

   - `<canvas>` 和 `<svg>` 的区别及适用场景？  
     `<canvas>` 适合动态生成图形（如数据可视化），基于像素操作；`<svg>` 是矢量图形，适合静态图标或需缩放的场景，支持事件绑定。
   - 如何优化 `<video>` 和 `<audio>` 的加载性能？  
     使用 `preload="metadata"` 预加载元数据，搭配 `poster` 设置预览图，避免自动播放（`autoplay` 需配合 `muted`）。

3. **Web 存储与离线应用**
   - `localStorage`、`sessionStorage` 与 `cookie` 的区别？  
     存储容量（5M vs 4k）、生命周期（永久/会话期 vs 过期时间）、数据携带（`cookie` 自动随请求发送）。
   - 如何实现离线缓存（Service Worker）？  
     注册 Service Worker，通过 `Cache API` 缓存静态资源，处理 `fetch` 事件拦截请求。

### 二、性能优化与渲染机制

1. **关键渲染路径优化**

   - 浏览器渲染过程中，HTML、CSS、JS 的加载顺序如何影响首屏性能？  
     CSS 阻塞渲染，JS 阻塞解析，需通过 `async`/`defer` 异步加载 JS，内联关键 CSS，预加载（`preload`）重要资源。
   - 如何减少重排（回流）和重绘？  
     避免频繁修改几何属性，使用 `requestAnimationFrame` 批量更新，将动画元素脱离文档流（`position: fixed` 或 `transform`）。

2. **图片优化策略**
   - 电商网站图片加载慢，有哪些优化方案？  
     懒加载（`loading="lazy"`）、响应式图片（`srcset`/`sizes`）、WebP 格式（体积比 JPEG 小 25%）、雪碧图减少 HTTP 请求。
   - 如何实现图片渐进式加载？  
     使用 `Intersection Observer API` 监听图片进入视口，配合低分辨率占位图（LQIP）。

### 三、无障碍访问（a11y）与 SEO

1. **无障碍设计实践**

   - 如何为图片添加替代文本（alt 属性）？  
     描述图片内容或功能，避免冗余（如“点击这里”），装饰性图片设 `alt=""`。
   - ARIA 角色的作用及使用场景？  
     补充语义信息，如 `role="button"` 增强可交互性，`aria-hidden="true"` 隐藏视觉元素但保留给辅助技术。

2. **SEO 前端优化要点**
   - 如何通过 HTML 提升页面搜索引擎排名？  
     使用语义化标签、合理嵌套标题（H1-H6）、优化 `title` 和 `meta description`，避免重复内容。
   - 单页应用（SPA）如何解决 SEO 问题？  
     服务端渲染（SSR）、静态生成（SSG）、使用 `rel="canonical"` 规范 URL，异步加载关键内容。

### 四、表单与交互

1. **表单验证与用户体验**

   - HTML5 表单新增的验证属性有哪些？  
     `required`、`pattern`（正则匹配）、`min`/`max`（数值范围）、`email`/`tel` 类型自动校验。
   - 如何实现文件上传的预览功能？  
     使用 `FileReader API` 读取文件内容，将图片转为 base64 显示在页面。

2. **拖放 API 与交互设计**
   - 如何实现拖拽文件上传？  
     监听 `dragover` 和 `drop` 事件，通过 `event.dataTransfer.files` 获取文件，阻止默认行为。
   - 拖放操作中的事件触发顺序是什么？  
     `dragstart`（源元素）→ `dragenter` → `dragover` → `drop`（目标元素）→ `dragend`。

### 五、浏览器兼容性与前沿技术

1. **兼容性处理技巧**

   - 如何处理不同浏览器对 `box-sizing` 的默认值差异？  
     全局设置 `* { box-sizing: border-box; }`，覆盖标准盒模型与怪异盒模型的不一致。
   - 老旧浏览器（如 IE9）不支持 HTML5 标签怎么办？  
     使用 `document.createElement` 动态创建标签，搭配 HTML5 Shiv 库修复样式。

2. **Web Components 与自定义元素**
   - 如何创建一个自定义元素（Custom Element）？  
     继承 `HTMLElement`，使用 `customElements.define` 注册，通过 Shadow DOM 封装样式和逻辑。
   - Shadow DOM 的作用及应用场景？  
     实现样式隔离和 DOM 封装，适合开发可复用组件（如弹窗、表单控件）。

### 六、实际场景与综合问题

1. **性能监控与优化案例**

   - 如何分析页面性能瓶颈？  
     使用 Lighthouse 审计工具，检查 TTI（首次可交互时间）、FCP（首次内容绘制），定位长任务和渲染阻塞资源。
   - 优化页面加载速度的具体步骤是什么？  
     压缩资源、CDN 加速、减少 DOM 节点、延迟非关键 JS 执行，使用 `preconnect` 预连接第三方域名。

2. **复杂场景下的 HTML 设计**
   - 如何实现一个支持响应式的富文本编辑器？  
     使用语义化标签（如 `<article>` 包裹内容），结合 `contenteditable` 属性，通过媒体查询适配不同屏幕尺寸。
   - 如何在 HTML 中实现暗黑模式切换？  
     通过 `class` 切换主题样式，使用 `prefers-color-scheme` 媒体查询适配系统设置。

### 七、高频八股文与细节问题

1. **基础概念辨析**

   - `DOCTYPE` 的作用是什么？  
     声明文档类型，触发浏览器标准模式，避免怪异模式导致的布局差异。
   - `title` 和 `alt` 属性的区别？  
     `title` 提供悬停提示，`alt` 描述图片内容（无障碍与 SEO 关键）。

2. **历史 API 与路由管理**
   - 如何实现无刷新页面跳转？  
     使用 `history.pushState` 更新 URL，配合 AJAX 加载内容，监听 `popstate` 事件处理回退。
   - 前端路由与后端路由的区别？  
     前端路由通过 JS 动态匹配路径，后端路由根据 URL 分发请求，SPA 需配置服务端 fallback 路由。

### 八、总结与备考建议

1. **核心考察方向**

   - 深度理解 HTML5 新特性的实际应用，而非表面记忆。
   - 结合性能优化、无障碍、SEO 等维度分析问题。
   - 展示项目经验，如如何解决复杂场景下的 HTML 设计挑战。

2. **学习资源推荐**
   - MDN Web 文档：深入学习 HTML 规范与 API。
   - Lighthouse 审计工具：实战性能优化。
   - CSS-Tricks：了解前沿技术（如 CSS Houdini）与最佳实践。
