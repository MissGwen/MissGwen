## React 18 中 Fiber 架构是什么以及实现原理

在 React 18 中，Fiber 架构是一种对 React 核心算法的重新实现，旨在提高 React 应用的性能和响应性。

- Fiber 架构是什么

  Fiber 可以理解为一种数据结构，也是 React 内部的一种执行机制。它代表着 React 元素树中的一个节点，每个节点包含了组件的信息以及与其他节点的关系。Fiber 架构使得 React 可以将渲染工作分割成小的任务单元，实现增量渲染和可中断的渲染过程。

- Fiber 架构的实现原理

  1. 任务分割与优先级调度：

  - React 将渲染过程划分为一个个小的任务单元，称为 Fiber。每个 Fiber 代表一个组件或者 DOM 节点。这些任务可以被中断和恢复，使得 React 可以在不阻塞主线程的情况下进行渲染。
  - React 会根据任务的优先级来决定先执行哪些任务。高优先级的任务（如用户交互响应）会优先执行，而低优先级的任务（如在后台进行的数据加载）可以被推迟。这样可以确保用户界面的响应性。

  2. 双缓冲树结构：

  - React 使用了两颗 Fiber 树来实现高效的渲染更新。一颗称为 current 树，表示当前在屏幕上显示的 DOM 结构；另一颗称为 workInProgress 树，表示正在进行中的渲染任务的结果。
  - 在进行渲染更新时，React 会基于 current 树创建 workInProgress 树。当 workInProgress 树构建完成后，它会替换 current 树成为新的显示树。这种双缓冲的结构可以避免在渲染过程中频繁地操作 DOM，提高渲染性能。

  3. 协调过程：

  - 协调过程是 React 确定如何从 current 树转换到 workInProgress 树的过程。在这个过程中，React 会遍历 current 树和新的虚拟 DOM 树，比较两者的差异，并根据差异创建、更新或删除相应的 Fiber 节点。
  - 协调过程采用深度优先遍历的方式，从根节点开始，递归地比较子节点。如果节点类型发生变化，React 会销毁旧的节点并创建新的节点；如果节点的属性发生变化，React 会更新相应的 DOM 属性。

  4. 增量渲染和可中断性：

  - 由于渲染任务被分割成小的 Fiber 单元，React 可以在任何时候中断渲染过程，去处理更高优先级的任务。当高优先级任务完成后，React 可以恢复被中断的渲染任务，继续进行增量渲染。
  - 这种可中断性使得 React 能够在不阻塞主线程的情况下响应用户交互和其他高优先级事件，提高了应用的响应性。

总之，React 18 中的 Fiber 架构通过任务分割、优先级调度、双缓冲树结构和协调过程等机制，实现了高效的渲染更新和良好的用户体验。它使得 React 能够更好地处理大型应用和复杂的交互场景，提高了应用的性能和响应性。
