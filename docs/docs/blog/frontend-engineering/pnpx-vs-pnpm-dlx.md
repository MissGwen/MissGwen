# pnpx 和 pnpm dlx 的区别：怎么选更稳妥？

在前端工程里，我们经常需要“一次性执行”某个 CLI，比如创建项目、运行代码生成器、临时执行检查工具。  
这时最常见的两个命令就是 `pnpx` 和 `pnpm dlx`。

先说结论：如果你已经使用 pnpm，团队协作和文档里优先写 `pnpm dlx`，`pnpx` 更适合作为快捷写法。

## 一、两者是什么关系

- `pnpm dlx`：pnpm 官方命令，语义明确，适合写在文档、脚本和团队规范里。
- `pnpx`：更短的调用方式，通常用于临时手敲命令。

很多同学把 `pnpx` 当成 `npx` 的同义替换，这是最容易踩的坑。  
`pnpx` 走的是 pnpm 的依赖解析与缓存逻辑，而不是 npm 的那一套行为。

## 二、核心区别对比

| 维度 | pnpx | pnpm dlx |
| --- | --- | --- |
| 命令定位 | 快捷入口 | 官方子命令 |
| 可读性 | 短，输入快 | 语义清晰，团队更易理解 |
| 团队规范 | 一般不作为规范首选 | 更适合写进 README/脚手架文档 |
| CI 可维护性 | 可用，但表达意图较弱 | 推荐，命令意图明确 |
| 行为基础 | 基于 pnpm 机制 | 基于 pnpm 机制 |

## 三、典型使用场景

## 1) 脚手架初始化（新项目）

更推荐：

```bash
pnpm dlx create-vite@latest my-app
```

原因：写在文档里更直观，团队成员一眼就知道这是 pnpm 的临时执行命令。

## 2) 日常临时执行（个人本地）

更顺手：

```bash
pnpx create-vite@latest demo-app
```

原因：输入短，适合临时手动操作。

## 3) 团队脚本与 CI

推荐统一：

```bash
pnpm dlx prisma generate
pnpm dlx @graphql-codegen/cli --config codegen.ts
```

原因：CI 日志中语义更清晰，后续排查问题时更容易定位。

## 四、常见问题与误区

## 1) 为什么同一条命令在不同机器上表现不一致？

常见原因：

- Node 与 pnpm 版本不同。
- 某些 CLI 默认取最新版本，未显式锁版本。
- 网络源配置不同导致安装速度或拉取结果不同。

建议：对关键 CLI 显式指定版本，例如 `create-vite@latest` 或固定到具体版本号。

## 2) 这两个命令会污染全局环境吗？

一般不会按“全局安装工具”的方式长期污染环境，它们主要用于临时执行。  
但临时拉取的包仍会走包管理器缓存，后续再执行会更快。

## 3) 可以直接拿 npm 的 npx 经验照搬吗？

不建议。  
虽然目标都类似“执行一次 CLI”，但 pnpm 与 npm 的依赖与缓存机制不同，排错思路也不同。

## 五、实用命令清单

```bash
# 创建 Vite 项目（推荐写法）
pnpm dlx create-vite@latest my-app

# 快捷写法
pnpx create-vite@latest my-app

# 执行代码生成工具
pnpm dlx @graphql-codegen/cli --config codegen.ts

# 执行 Prisma 生成
pnpm dlx prisma generate
```

## 六、如何选型（可直接照抄）

- 个人临时命令：`pnpx`
- 团队文档与教程：`pnpm dlx`
- CI、自动化脚本：`pnpm dlx`
- 需要长期可维护和可读性：`pnpm dlx`

如果你的团队已经统一使用 pnpm，把 `pnpm dlx` 当默认写法，基本不会错。
