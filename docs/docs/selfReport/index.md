### 关于 `Electron` 使用 `webview` 外接网站需求的总结

不知道有没有人跟我做过一样的需求哈，其实我并没有在网上找到过相关的案例，只有一个成熟的项目供我参考（还没有源码），大概需求是这样的：

- 使用 `Electron` 框架开发跨平台客户端应用
- 需要内置嵌入一些外部的网站，并对嵌入的网站执行一些相关的 `DOM` 操作
- 支持网站多开，多账号，言外之意就是需要相对隔离的环境
- 支持给单独的网站配置代理，在多开的基础上，每个网站可以走单独的代理服务器去访问
- 嵌入的网站进入特定的页面之后，可以提取网页中的文字进行翻译，后回显到页面

大概总结了一下主要的需求，当然还有一些细节问题，比如翻译配置等等，那些都不重要，从网上找了零零散散的资料，自己搞了一下整体流程的架构，想着来分享一下，可能根本没人看，毕竟这些需求确实很抽象，大家可能都不会涉及...

#### 嵌入外部网站

对于嵌入外部网站，我还是选择了 `electron` 的 `webview` 标签，虽然官方可能并不推荐，还是考虑到他比较方便容易吧，我感觉总比去 `new BrowserView()` 来的更直接

1. `electron` 默认选项是关闭的，所以

```ts
import { BrowserWindow } from "electron";

const mainWindow = new BrowserWindow({
  // 其他配置
  webPreferences: {
    // 启动 webviewTag
    webviewTag: true,
  },
});
```

2. 设置 `webview` 标签

```vue
<webview src="https://www.xxxx.com/" />
```

3. 如果使用的 `Vue` 前端框架 控制台应该会报警告 因为 `webview` 标签并不是原生标签

```ts
// vite.config.ts

plugins: [
  vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return tag === "webview";
        },
      },
    },
  }),
];
```
