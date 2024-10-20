## any 和 unknown 的区别

- `any` 类型：
  any 类型是 TypeScript 中的 一种特殊类型，它允许你在编译阶段绕过类型检查。当你声明一个变量为 any 类型时，TypeScript 编译器将不会对它的操作进行类型检查。
  any 类型可以被赋值为任何类型的值，也可以赋值给任何类型的变量。
  使用 any 类型相当于是在告诉 TypeScript：“我相信这个变量的类型，你不需要进行检查。”这可能会导致运行时错误，因为类型错误可能在编译阶段被忽略。

- `unknown` 类型：
  unknown 类型是 TypeScript 3.0 中引入的一种新类型，它是对 any 类型的一个更安全的选择。unknown 类型表示一个未知类型的值。
  与 any 类型不同，unknown 类型的变量不能直接进行任何操作，除非你先进行某种类型的检查（例如使用类型断言或类型守卫）。
  unknown 类型可以被认为是“类型安全的 any”，因为它迫使你在使用它之前先确认类型。

## type 和 interface 的区别

在 TypeScript 中，`type` 和 `interface` 都是用来定义类型的，但它们在使用方式和某些特性上有所不同。以下是一些主要的区别：

1. **定义方式**:

   - `type` 用于定义非联合类型或非交叉类型的别名。
   - `interface` 用于定义对象类型，可以扩展或继承其他接口。

2. **扩展和继承**:

   - `interface` 可以通过 `extends` 关键字扩展其他接口或接口的集合（多个接口）。
   - `type` 不能直接扩展其他类型，但可以通过交叉类型（`&`）实现类似的效果。

3. **合并声明**:

   - TypeScript 允许相同名称的 `interface` 声明合并。这意味着你可以定义多个同名接口，TypeScript 会将它们合并为一个接口。
   - `type` 不支持声明合并。如果你尝试定义两个相同名称的 `type`，将会导致编译错误。

4. **表达式类型**:

   - `type` 可以定义任何类型的别名，包括基本类型、联合类型、交叉类型、元组类型等。
   - `interface` 仅限于定义对象类型。

5. **匿名类型**:

   - `type` 常用于定义匿名类型或复杂的联合/交叉类型。
   - `interface` 通常用于定义具有明确名称和意图的类型。

6. **类型查询**:

   - `type` 不能用于类型查询。你不能在类型查询中使用 `typeof` 来获取一个 `type` 的类型。
   - `interface` 可以用于类型查询，你可以使用 `typeof` 来获取一个 `interface` 的类型。

7. **实现（implements）**:

   - 类可以使用 `implements` 关键字来实现 `interface`，表明该类符合接口定义的契约。
   - `type` 不能被类实现。

8. **扩展原始类型**:

   - `type` 可以用来扩展原始类型，例如为字符串添加新的属性。
   - `interface` 不能直接扩展原始类型。

9. **动态类型**:

   - `type` 可以使用泛型和条件类型来创建更动态的类型。
   - `interface` 通常用于静态类型的定义。

10. **工具类型**:

    - `type` 通常用于创建工具类型，如 `Partial`、`Readonly`、`Pick` 等。

    - `interface` 不常用于创建工具类型。

## 使用 interface 给 Function / Array / Class 做类型声明

- 函数声明

```ts
interface Fn {
  (parma: string): void;
}
```

- 数组声明

```ts
interface Arr {
  [index: number]: string;
}
```

- 类声明

```ts
interface C {
  name: string;
  fn(name: string): string;
}
```
