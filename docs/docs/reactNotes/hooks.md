## use

use 是一个 React Hook，它可以让你读取类似于 Promise 或 context 的资源的值。

```js
const value = use(resource);
```

与其他 React Hook 不同的是，可以在循环和条件语句（如 `if`）中调用 `use`。但需要注意的是，调用 `use` 的函数仍然必须是一个组件或 Hook。

当使用 Promise 调用 `use` Hook 时，它会与 [`Suspense`](https://zh-hans.react.dev/reference/react/Suspense) 和 [错误边界](https://zh-hans.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary) 集成。当传递给 `use` 的 Promise 处于 pending 时，调用 `use` 的组件也会 **挂起**。如果调用 `use` 的组件被包装在 Suspense 边界内，将显示后备 UI。一旦 Promise 被解决，Suspense 后备方案将被使用 `use` Hook 返回的数据替换。如果传递给 `use` 的 Promise 被拒绝，将显示最近错误边界的后备 UI。



## useCallback

`useCallback` 是一个允许你在多次渲染中缓存函数的 React Hook。

```js
const cachedFn = useCallback(fn, dependencies)
```

在组件顶层调用 `useCallback` 以便在多次渲染中缓存函数：

#### 参数

- `fn`：想要缓存的函数。此函数可以接受任何参数并且返回任何值。React 将会在初次渲染而非调用时返回该函数。当进行下一次渲染时，如果 `dependencies` 相比于上一次渲染时没有改变，那么 React 将会返回相同的函数。否则，React 将返回在最新一次渲染中传入的函数，并且将其缓存以便之后使用。React 不会调用此函数，而是返回此函数。你可以自己决定何时调用以及是否调用。

- `dependencies`：有关是否更新 `fn` 的所有响应式值的一个列表。响应式值包括 props、state，和所有在你组件内部直接声明的变量和函数。如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将校验每一个正确指定为依赖的响应式值。依赖列表必须具有确切数量的项，并且必须像 `[dep1, dep2, dep3]` 这样编写。React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 比较每一个依赖和它的之前的值。

#### 返回值

在初次渲染时，`useCallback` 返回你已经传入的 `fn` 函数

在之后的渲染中, 如果依赖没有改变，`useCallback` 返回上一次渲染中缓存的 `fn` 函数；否则返回这一次渲染传入的 `fn`。



## useContext

`useContext` 是一个 React Hook，可以让你读取和订阅组件中的 [context](https://zh-hans.react.dev/learn/passing-data-deeply-with-context)。

```js
const value = useContext(SomeContext)
```

#### 参数

- `SomeContext`：先前用 [`createContext`](https://zh-hans.react.dev/reference/react/createContext) 创建的 context。context 本身不包含信息，它只代表你可以提供或从组件中读取的信息类型。

#### 返回值

`useContext` 为调用组件返回 context 的值。它被确定为传递给树中调用组件上方最近的 `SomeContext.Provider` 的 `value`。如果没有这样的 provider，那么返回值将会是为创建该 context 传递给 [`createContext`](https://zh-hans.react.dev/reference/react/createContext) 的 `defaultValue`。返回的值始终是最新的。如果 context 发生变化，React 会自动重新渲染读取 context 的组件。

#### 用法

###### 向组件树深层传递数据

在组件的最顶级调用 `useContext` 来读取和订阅 [context](https://zh-hans.react.dev/learn/passing-data-deeply-with-context)。

```js
import { useContext } from 'react';

function Button() {
  const theme = useContext(ThemeContext);
  // ...
```

`useContext` 返回你向 context 传递的 context value。为了确定 context 值，React 搜索组件树，为这个特定的 context **向上查找最近的** context provider。

若要将 context 传递给 `Button`，请将其或其父组件之一包装到相应的 context provider：



## useDebugValue

`useDebugValue` 是一个 React Hook，可以让你在 [React 开发工具](https://zh-hans.react.dev/learn/react-developer-tools) 中为自定义 Hook 添加标签。

```js
useDebugValue(value, format?)
```

#### 参考

### `useDebugValue(value, format?)`

在你的 [自定义 Hook](https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks) 的顶层调用 `useDebugValue`，以显示可读的调试值：

```js
import { useDebugValue } from 'react';

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline');
  // ...
}
```

#### 参数

* `value`：你想在 React 开发工具中显示的值。可以是任何类型。
* **可选** `format`：它接受一个格式化函数。当组件被检查时，React 开发工具将用 `value` 作为参数来调用格式化函数，然后显示返回的格式化值（可以是任何类型）。如果不指定格式化函数，则会显示 `value`。

#### 返回值 无



## useDeferredValue

`useDeferredValue` 是一个 React Hook，可以让你延迟更新 UI 的某些部分。

```js
const deferredValue = useDeferredValue(value)
```

#### 参考

### `useDeferredValue(value)`

在组件的顶层调用 `useDeferredValue` 来获取该值的延迟版本。

```js
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  // ...
}
```

#### 参数

* `value`：你想延迟的值，可以是任何类型。

#### 返回值

在组件的初始渲染期间，返回的延迟值将与你提供的值相同。但是在组件更新时，React 将会先尝试使用旧值进行重新渲染（因此它将返回旧值），然后再在后台使用新值进行另一个重新渲染（这时它将返回更新后的值）。



## useEffect

`useEffect` 是一个 React Hook，它允许你 [将组件与外部系统同步](https://zh-hans.react.dev/learn/synchronizing-with-effects)。

```js
useEffect(setup, dependencies?)
```

#### 参考

### `useEffect(setup, dependencies?)`

在组件的顶层调用 `useEffect` 来声明一个 Effect：

```js
import { useEffect } from 'react';
import { createConnection } from './chat.js';

function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => {
      connection.disconnect();
    };
  }, [serverUrl, roomId]);
  // ...
}：
```

#### 参数

* `setup`：处理 Effect 的函数。setup 函数选择性返回一个 **清理（cleanup）** 函数。当组件被添加到 DOM 的时候，React 将运行 setup 函数。在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。

* **可选** `dependencies`：`setup` 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将验证是否每个响应式值都被正确地指定为一个依赖项。依赖项列表的元素数量必须是固定的，并且必须像 `[dep1, dep2, dep3]` 这样内联编写。React 将使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较每个依赖项和它先前的值。如果省略此参数，则在每次重新渲染组件之后，将重新运行 Effect 函数。如果你想了解更多，请参见 [传递依赖数组、空数组和不传递依赖项之间的区别](https://zh-hans.react.dev/reference/react/useEffect#examples-dependencies)。

#### 返回值

`useEffect` 返回 `undefined`。



## useId

`useId` 是一个 React Hook，可以生成传递给无障碍属性的唯一 ID。

```js
const id = useId()
```

#### 参考

在组件的顶层调用 `useId` 生成唯一 ID：

```js
import { useId } from 'react';

function PasswordField() {
  const passwordHintId = useId();
  // ...
```

#### 参数

`useId` 不带任何参数。

#### 返回值

`useId` 返回一个唯一的字符串 ID，与此特定组件中的 `useId` 调用相关联。



## useImperativeHandle

`useImperativeHandle` 是 React 中的一个 Hook，它能让你自定义由 [ref](https://zh-hans.react.dev/learn/manipulating-the-dom-with-refs) 暴露出来的句柄。

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

#### 参考

### `useImperativeHandle(ref, createHandle, dependencies?)`

在组件顶层通过调用 `useImperativeHandle` 来自定义 ref 暴露出来的句柄：

```js
import { forwardRef, useImperativeHandle } from 'react';

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(ref, () => {
    return {
      // ... 你的方法 ...
    };
  }, []);
  // ...
```

#### 参数

* `ref`：该 `ref` 是你从 [`forwardRef` 渲染函数](https://zh-hans.react.dev/reference/react/forwardRef#render-function) 中获得的第二个参数。

* `createHandle`：该函数无需参数，它返回你想要暴露的 ref 的句柄。该句柄可以包含任何类型。通常，你会返回一个包含你想暴露的方法的对象。

* **可选的** `dependencies`：函数 `createHandle` 代码中所用到的所有反应式的值的列表。反应式的值包含 props、状态和其他所有直接在你组件体内声明的变量和函数。倘若你的代码检查器已 [为 React 配置好](https://zh-hans.react.dev/learn/editor-setup#linting)，它会验证每一个反应式的值是否被正确指定为依赖项。该列表的长度必须是一个常数项，并且必须按照 `[dep1, dep2, dep3]` 的形式罗列各依赖项。React 会使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较每一个依赖项与其对应的之前值。如果一次重新渲染导致某些依赖项发生了改变，或你没有提供这个参数列表，你的函数 `createHandle` 将会被重新执行，而新生成的句柄则会被分配给 ref。

#### 返回值

`useImperativeHandle` 返回 `undefined`。



## useLayoutEffect

`useLayoutEffect` 是 [`useEffect`](https://zh-hans.react.dev/reference/react/useEffect) 的一个版本，在浏览器重新绘制屏幕之前触发。

```js
useLayoutEffect(setup, dependencies?)
```

#### 参考

调用 `useLayoutEffect` 在浏览器重新绘制屏幕之前进行布局测量：

```js

import { useState, useRef, useLayoutEffect } from 'react';

function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height);
  }, []);
  // ...
```

#### 参数

* `setup`：处理副作用的函数。setup 函数选择性返回一个_清理_（cleanup）函数。在将组件首次添加到 DOM 之前，React 将运行 setup 函数。在每次因为依赖项变更而重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除之前，React 将最后一次运行 cleanup 函数。

* **可选** `dependencies`：`setup` 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将验证每个响应式值都被正确地指定为一个依赖项。依赖项列表必须具有固定数量的项，并且必须像 `[dep1, dep2, dep3]` 这样内联编写。React 将使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较每个依赖项和它先前的值。如果省略此参数，则在每次重新渲染组件之后，将重新运行副作用函数。

#### 返回值

`useLayoutEffect` 返回 `undefined`。



## useMemo

`useMemo` 是一个 React Hook，它在每次重新渲染的时候能够缓存计算的结果。

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

#### 参考

在组件的顶层调用 `useMemo` 来缓存每次重新渲染都需要计算的结果。

```js
import { useMemo } from 'react';

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab]
  );
  // ...
}
```

#### 参数

* `calculateValue`：要缓存计算值的函数。它应该是一个没有任何参数的纯函数，并且可以返回任意类型。React 将会在首次渲染时调用该函数；在之后的渲染中，如果 `dependencies` 没有发生变化，React 将直接返回相同值。否则，将会再次调用 `calculateValue` 并返回最新结果，然后缓存该结果以便下次重复使用。

* `dependencies`：所有在 `calculateValue` 函数中使用的响应式变量组成的数组。响应式变量包括 props、state 和所有你直接在组件中定义的变量和函数。如果你在代码检查工具中 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，它将会确保每一个响应式数据都被正确地定义为依赖项。依赖项数组的长度必须是固定的并且必须写成 `[dep1, dep2, dep3]` 这种形式。React 使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 将每个依赖项与其之前的值进行比较。

#### 返回值

在初次渲染时，`useMemo` 返回不带参数调用 `calculateValue` 的结果。

在接下来的渲染中，如果依赖项没有发生改变，它将返回上次缓存的值；否则将再次调用 `calculateValue`，并返回最新结果。
