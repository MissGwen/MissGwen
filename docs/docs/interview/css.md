## CSS 3 新特性

- 圆角（border-radius）：允许你给元素添加圆角，而无需使用图片或其他复杂的方法。

- 阴影（box-shadow 和 text-shadow）：可以给元素或文字添加阴影效果，提升视觉效果。

- 渐变（linear-gradient 和 radial-gradient）：允许你为元素背景设置颜色渐变，增加了设计上的多样性。

- 过渡（transition）：允许你为属性变化设置动画效果，使状态变化更加平滑。

- 动画（@keyframes 和 animation）：允许你创建复杂的动画序列，而无需依赖 JavaScript。

- 变形（transform）：允许你对元素进行旋转、缩放、倾斜或平移。

- 弹性盒模型（flexbox）：为布局提供了一种更加灵活和强大的方式，特别是在响应式设计中。

- 网格布局（grid）：提供了一种基于网格的布局系统，使复杂布局的实现变得更加简单。

- 多媒体查询：允许你根据不同的屏幕大小或设备特性应用不同的样式规则，是响应式设计的关键。

- 自定义属性（CSS 变量）：允许你定义可以在整个文档中重复使用的变量，简化了样式表的维护。

- 滤镜（filter）：提供了一系列图像处理效果，如模糊、对比度调整等。

- 混合模式（mix-blend-mode）：允许元素与其背景以不同的方式混合。

- 形状（shape-outside）：允许你围绕非矩形形状进行文本布局。

- 计算函数（calc()）：允许你在 CSS 中进行简单的计算。

- 媒体查询：改进了响应式设计的支持，使得针对不同设备和条件应用不同的样式更加方便。

## 选择器优先级 样式优先级

- !important

- 行内样式

- ID 选择器

- 伪类选择器 `:hover`

- Class 选择器

- 属性选择器 `[name=xxx]`

- 标签选择器

- 全局选择器

## 水平垂直居中的方法

- 定位 + margin

  ```css
  .father {
    position: relative;
  }

  .son {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  ```

- 定位 + transform

  ```css
  .father {
    position: relative;
  }

  .son {
    position: absolute;
    transform: translate(-50%, -50%);
  }
  ```

- flex 布局

  ```css
  .father {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ```

- grid 布局

- table 布局

## BFC 规范

**区块格式化上下文**（Block Formatting Context，BFC）是 Web 页面的可视 CSS 渲染的一部分，是块级盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。BFC 的子元素不会对外面的元素产生影响

### 创建 BFC

- 文档根元素 `<html>`

- 浮动元素

- 绝对定位元素 `position:absolute/fixed`

- 行内块元素 `display:inline-block`

- 表格单元格/标题 `display:table-cell/table-caption`

- `overflow` 值不为  `visible`  或  `clip`  的块级元素

- `display`  值为  `flow-root`  的元素

- `contain`  值为  `layout`、`content`  或  `paint`  的元素

* 弹性元素 `display`值为  `flex`  或  `inline-flex`

* 网格元素 `display`值为  `grid`  或  `inline-grid`

* 多列容器（[`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count)  或  [`column-width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width "Currently only available in English (US)")  值不为  `auto`，且含有  `column-count: 1`  的元素）。

* `column-span`  值为  `all`  的元素始终会创建一个新的格式化上下文，即使该元素没有包裹在一个多列容器中（[规范变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)、[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）

### BFC 解决什么问题

- `margin` 重合问题

- `margin` 塌陷问题

- 高度坍塌问题

## 清除浮动的方式

- 在最后一个浮动标签后添加标签，样式为 `clear:both`

- 父元素添加 `overflow:hidden` 触发 BFC 方式

- 使用 `after` 伪元素，IE6/7 不支持，应使用 `zoom:1`

## 双飞翼&&圣杯布局实现

- 两侧宽度固定，中间自适应，中间一栏先加载渲染 （float + margin）

## css 哪些属性可以继承

- 字体的属性 `font`

- 文本的属性 `line-height`

- 元素的可见性 `visibility:hidden`

- 表格布局的属性 `border-spacing`

- 列表的属性 `list-style`

- 页面的样式属性 `page`

- 声音的样式属性

## 处理文本超出长度问题

- 单行文本 `text-overflow: ellipsis`

  ```css
  .text-overflow {
    white-space: nowrap; /* 确保文本在一行内显示 */
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 显示省略号 */
  }
  ```

- 多行文本

  ```css
  .multi-line-ellipsis {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 限制为3行 */
    overflow: hidden;
  }
  ```

## Flex 布局

## Grid 布局

## 动画原理

CSS3 动画是通过改变元素的样式属性，在一定时间内不断地重绘界面，从而产生视觉上的动画效果。这种动画主要依赖于 CSS3 中引入的两个重要属性：`transition` 和 `animation`。

### Transition（过渡）

`transition`属性用于定义一个属性值发生变化时的过渡效果。当元素的某个属性值发生变化时，`transition`可以控制这个变化过程，使其平滑过渡而不是立即跳变。它包含以下几个子属性：

- `transition-property`：指定应用过渡的 CSS 属性。
- `transition-duration`：定义过渡效果持续的时间。
- `transition-timing-function`：指定过渡的动画函数，如`ease`、`linear`、`ease-in`等。
- `transition-delay`：指定过渡效果开始前的延迟时间。

### Animation（动画）

`animation`属性则更加强大，它允许开发者定义更为复杂的动画序列。通过`@keyframes`规则，可以创建多个关键帧，在动画过程中，CSS 样式会在这些关键帧之间自动切换。`animation`的子属性包括：

- `animation-name`：指定由`@keyframes`定义的关键帧名称。
- `animation-duration`：动画一个周期的时长。
- `animation-timing-function`：动画的运动方式。
- `animation-delay`：动画开始前的延迟时间。
- `animation-iteration-count`：动画的播放次数。
- `animation-direction`：动画是否应该轮流反向播放。
- `animation-fill-mode`：定义动画在执行前后如何为目标元素应用样式。
- `animation-play-state`：允许暂停和播放动画。

### 动画原理

CSS3 动画的基本原理是利用浏览器的渲染引擎在动画运行时对元素样式的不断计算和重绘。当浏览器解析 CSS 样式时，如果遇到动画属性，它会根据动画的持续时间、延迟、迭代次数等属性，计算出每一帧应该应用的样式。这个过程通常是每秒多次（例如，每秒 60 帧），以产生平滑的动画效果。
在动画执行过程中，浏览器会在每一帧之间自动插入补间（tweening），这是通过`transition-timing-function`定义的动画函数来实现的，它决定了动画的速度曲线。例如，`ease`会在开始和结束时减慢动画速度，而`linear`则保持匀速。

### 性能考虑

CSS3 动画通常具有较好的性能，因为浏览器可以对动画进行优化。然而，如果动画过于复杂或者帧率过高，仍然可能导致性能问题。为了提高性能，开发者应该尽量减少动画中的重绘和重排，合理使用 CSS 属性，并避免在动画中频繁操作 DOM。

## 如何处理 css 在不同浏览器之间的兼容性

处理 CSS 在不同浏览器之间的兼容性是一个长期面临的前端开发挑战。以下是一些策略和技巧，可以帮助你确保 CSS 代码在各种浏览器中都能正确显示：

1. **使用自动化的工具和预处理器**：
   - 使用像 PostCSS 这样的工具，它可以帮你自动添加厂商前缀（例如 `-webkit-`, `-moz-`, `-ms-`）。
   - 使用 Sass, LESS 等 CSS 预处理器，它们提供了变量、混合（mixins）等功能，可以帮助你写出更易于维护和管理的 CSS 代码。
2. **使用 CSS Reset 或 Normalize.css**：
   - 引入 CSS Reset（如 Eric Meyer 的 Reset CSS）或 Normalize.css，这些库可以帮助减少不同浏览器之间的默认样式差异。
3. **使用 Feature Queries (@supports)**：
   - 通过`@supports`规则，你可以检测浏览器是否支持特定的 CSS 功能，并据此有条件地应用某些样式。
4. **使用 Modernizr**：
   - Modernizr 是一个 JavaScript 库，它可以检测浏览器是否支持某些 HTML5 和 CSS3 功能，并允许你根据检测结果加载不同的样式。
5. **避免使用过时或非标准的特性**：
   - 尽量避免使用已经被废弃或非标准的 CSS 特性，这些特性在不同浏览器上的表现可能不一致。
6. **测试和调试**：
   - 使用浏览器的开发者工具进行测试和调试。
   - 使用像 BrowserStack 这样的服务在不同的浏览器和设备上进行测试。
7. **渐进增强和优雅降级**：
   - 采用渐进增强的策略，首先确保核心功能在所有浏览器上都能正常工作，然后为支持的浏览器添加额外的样式和功能。
   - 优雅降级意味着设计复杂的布局时，先为现代浏览器提供高级体验，然后确保在旧浏览器中至少可以正常使用。
8. **使用 CSS Hack**：
   - 虽然不推荐，但在某些情况下，你可能需要使用 CSS Hack 来解决特定浏览器的兼容性问题。这通常涉及到利用浏览器解析 CSS 时的特定错误或差异。
9. **保持知识更新**：
   - 浏览器的兼容性问题是随着浏览器版本的更新而变化的。保持对浏览器兼容性问题的最新知识，可以帮助你更有效地处理这些问题。
10. **使用 polyfill 和 shim**： - 对于某些不支持的功能，可以使用 polyfill 或 shim 来模拟这些功能，以实现跨浏览器的一致性。
    通过上述方法，你可以大大提高 CSS 代码在不同浏览器之间的兼容性，确保用户无论使用哪种浏览器都能获得良好的体验。

## 背景平铺

在 CSS 中，你可以使用`background-repeat`属性来控制背景图像的平铺方式。这个属性定义了背景图像如何沿水平和垂直方向重复。`background-repeat`可以有以下几个值：

- `repeat`: 背景图像将在水平和垂直方向上重复平铺。
- `no-repeat`: 背景图像不会平铺，只显示一次。
- `repeat-x`: 背景图像只在水平方向上重复平铺。
- `repeat-y`: 背景图像只在垂直方向上重复平铺。
- `space`: 背景图像在水平和垂直方向上平铺，但是会保持一定的间距，以确保整个容器被图像完全覆盖。
- `round`: 背景图像在水平和垂直方向上平铺，图像可能会被缩放，以确保整个容器被图像完全覆盖，且没有间隙。
  下面是一个例子，展示了如何设置背景图像的平铺：

```css
/* 背景图像在水平和垂直方向上重复平铺 */
.element {
  background-image: url("path-to-image.jpg");
  background-repeat: repeat;
}
/* 背景图像不会平铺，只显示一次 */
.element {
  background-image: url("path-to-image.jpg");
  background-repeat: no-repeat;
}
/* 背景图像只在水平方向上重复平铺 */
.element {
  background-image: url("path-to-image.jpg");
  background-repeat: repeat-x;
}
/* 背景图像只在垂直方向上重复平铺 */
.element {
  background-image: url("path-to-image.jpg");
  background-repeat: repeat-y;
}
/* 背景图像在水平和垂直方向上平铺，保持一定的间距 */
.element {
  background-image: url("path-to-image.jpg");
  background-repeat: space;
}
/* 背景图像在水平和垂直方向上平铺，可能缩放图像 */
.element {
  background-image: url("path-to-image.jpg");
  background-repeat: round;
}
```

在现代的 CSS 中，你也可以使用`background`简写属性来设置背景图像的重复方式，例如：

```css
.element {
  background: url("path-to-image.jpg") no-repeat center center;
}
```

在这个例子中，背景图像不会平铺，并且会定位在元素的中央。
