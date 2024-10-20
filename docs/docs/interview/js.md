## JS 的设计原理

- **基于原型**：JavaScript 的对象模型是基于原型的，这意味着对象可以直接从其他对象继承属性和方法，而不是使用类。这种模型提供了灵活的对象创建和继承机制。

- **动态类型**：JavaScript 是一种动态类型语言，这意味着变量在运行时可以改变类型，不需要在编译时声明变量类型。

- **事件驱动**：JavaScript 在浏览器中通常用于响应用户操作，如点击、移动等事件，从而执行相应的代码。

- **异步编程**：JavaScript 通过事件循环和回调函数支持异步编程，允许代码在等待某些操作（如网络请求）完成时继续执行，提高了程序的性能和响应性。

- **函数是一等公民**：在 JavaScript 中，函数是对象，可以作为参数传递给其他函数，可以作为其他函数的返回值，也可以拥有属性。

- **解释执行**：JavaScript 通常在运行时由 JavaScript 引擎（如 V8、SpiderMonkey 等）解释执行，而不是编译成机器码执行。

- **跨平台**：JavaScript 被设计为可以在不同的设备和操作系统上运行，只要有支持 JavaScript 的解析器。

- **安全性**：JavaScript 在设计时考虑到了安全性，例如，它不允许访问用户的文件系统，以防止恶意代码造成安全威胁。

- **单线程执行**：JavaScript 在浏览器中通常是单线程执行的，这意味着它一次只能执行一个任务。为了处理耗时的操作，JavaScript 使用异步编程模型。

- **标准化和扩展性**：随着 ECMAScript（JavaScript 语言的国际标准）的发展，JavaScript 不断更新和扩展，引入了新的语法和功能，以适应不断变化的编程需求。

## 深浅拷贝

- 浅拷贝
  
  - 使用`Object.assign`方法
  
  - 使用扩展运算符（...）
  
  - 使用 Array.prototype.slice()或 Array.prototype.concat()进行数组浅拷贝

- 深拷贝
  
  - 使用 JSON.parse(JSON.stringify(obj))（这种方法有局限性，不能拷贝函数、undefined、循环引用等）
  
  - 使用递归函数手动实现深拷贝
  
  - 使用第三方库，如 lodash 的\_.cloneDeep 方法
  
  - 原生深拷贝`structuredClone`

## 数组扁平化

- 使用`Array.prototype.flat()`
  ES2019 引入了 Array.prototype.flat()方法，可以用来扁平化数组。
  
  ```js
  const arr = [1, [2, [3, [4]], 5]];
  const flatArr = arr.flat(Infinity); // 使用Infinity作为深度，扁平化所有层级
  console.log(flatArr); // 输出：[1, 2, 3, 4, 5]
  ```

- 使用`Array.prototype.reduce()`和`Array.prototype.concat()`
  
  ```js
  const arr = [1, [2, [3, [4]], 5]];
  const flatArr = arr.reduce(
    (acc, val) => (Array.isArray(val) ? acc.concat(...val) : acc.concat(val)),
    []
  );
  console.log(flatArr); // 输出：[1, 2, 3, 4, 5]
  ```

- 使用递归
  
  ```js
  function flattenArray(arr) {
    let result = [];
    arr.forEach((item) => {
      if (Array.isArray(item)) {
        result = result.concat(flattenArray(item));
      } else {
        result.push(item);
      }
    });
    return result;
  }
  
  const arr = [1, [2, [3, [4]], 5]];
  const flatArr = flattenArray(arr);
  console.log(flatArr); // 输出：[1, 2, 3, 4, 5]
  ```

- 使用`Array.prototype.some()`和`Array.prototype.concat()`
  
  ```js
  function flattenArray(arr) {
    while (arr.some((item) => Array.isArray(item))) {
      arr = [].concat(...arr);
    }
    return arr;
  }
  
  const arr = [1, [2, [3, [4]], 5]];
  const flatArr = flattenArray(arr);
  console.log(flatArr); // 输出：[1, 2, 3, 4, 5]
  ```

- 使用 lodash 库的 `_.flattenDeep()`

## null 和 undefined 的区别

### `undefined`

表示一个声明了但没有被赋值的变量，或者一个不存在的对象属性。以下是一些产生 undefined 的场景

- 声明变量但是没有初始化

- 访问对象不存的属性

- 函数没有返回值时，默认返回

- 使用 `void` 表达式，如 `void(0)`

### `null`

null 是一个表示无值的特殊值，需要显式赋值给变量。它表示故意的空值，通常用于以下情况：

- 初始化一个将来可能被赋值为对象的变量

- 表示函数的参数或返回值没有对象

- 作为对象原型链的终点`（Object.prototype.__proto__）`

### 区别

- `undefined` 表示变量声明了但没有赋值，而 `null` 是一个表示无值的特殊值，需要显式赋值。

- 在类型转换时，`undefined` 转换为数字时为 `NaN`，而 `null` 转换为数字时为`0`。

- 在 `JSON` 格式中，`null` 是合法的值，而 `undefined` 不是。

- `undefined` 是全局对象的一个属性，而 `null` 是一个字面量。

### 类型检查

`undefined` 和 `null` 在类型检查时会被视为不同的类型：

```js
typeof undefined; // 输出："undefined"
typeof null; // 输出："object" (历史上的错误，现在被视为JavaScript语言的保留行为)
```

## Promise 的静态方法

### `Promise.all()`

当传入的所有 Promise 都成功解决时，返回一个解决的 Promise，其结果是一个包含所有传入 Promise 解决值的数组。如果传入的任意一个 Promise 被拒绝，那么返回的 Promise 就会立即被拒绝，并返回第一个被拒绝的 Promise 的理由。

### `Promise.race()`

返回一个 Promise，它将与第一个解决或拒绝的 Promise 同步解决或拒绝。

### `Promise.any()`

当传入的任意一个 Promise 成功解决后，返回一个解决的 Promise，其值是第一个成功解决的 Promise 的值。如果所有 Promise 都被拒绝，则返回的 Promise 会被拒绝，并且会抛出一个 AggregateError，这个错误包含了所有 Promise 的拒绝理由。

## 改变 this 指向

## 延迟加载 JS

- 动态插入 script 标签： 可以通过 JavaScript 动态创建一个 script 标签，并将其添加到文档中。这样，只有在执行这段代码时，JavaScript 文件才会被加载。

- 滚动事件监听： 可以监听用户的滚动事件，当用户滚动到页面某个特定位置时，加载对应的 JavaScript 文件。

- Intersection Observer API： 这是一个现代的浏览器 API，可以自动“观察”元素是否进入了视口（viewport），而无需监听滚动事件。当元素进入视口时，可以触发加载 JavaScript。

- defer 和 async 属性： 在 HTML script 标签中，可以使用 defer 或 async 属性来延迟加载脚本。defer 属性表示脚本将在文档完全解析后执行，而 async 属性表示脚本将在准备好后立即执行，不会阻塞页面渲染。

## 函数柯里化

函数柯里化（Currying）是一种在函数式编程中常用的技巧，它指的是将一个接受多个参数的函数转换成一系列使用一个参数的函数。简单来说，柯里化就是将一个多参数函数转换为一个嵌套的单参数函数的过程。

柯里化有一些优点，比如它可以提高代码的灵活性，使得函数的组合更加容易，并且可以用于部分应用（Partial Application），即固定一个或多个参数，生成一个新的函数。

然而，柯里化也有一些缺点，比如可能会导致代码的可读性降低，并且在某些情况下可能会增加调用栈的深度。