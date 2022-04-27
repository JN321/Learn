## ESnext

### 推荐

- 《你不知道的 JavaScript 上卷》很经典，适合多阅读
- 掘金小册《babel 相关》
  - [回顾 babel 6 和 7，来预测下 babel 8](https://juejin.cn/post/6956224866312060942)
  - [babel 插件通关密级](https://juejin.cn/book/6946117847848321055/section/6956174385904353288)

### babel

#### 基础概念

- 是什么？是 js 的编译器，提高了 js 代码的兼容性。
- 做了什么？
  - 转换语法、编译降级
  - 通过`polyfill`的方式在目标环境中添加缺失的特性(babel7 中通过 @babel/polyfill 不过在 babel7 中处于被废弃的状态，其功能被 core.js 所取代)
- 为什么？浏览器作为一个客户侧的产品，对 js 新语法的支持存在滞后性。同一个浏览器的不同版本以及不同的浏览器之间对 js 的支持都会存在很多的差异，所以需要 babel 对 js 语言做`编译降级`

#### babel 的构建流程

- bebel 的功能一直都非常明确：将源码中的新语法和 API 转换为目标浏览器所支持的语法。并且，所有转化的功能都是通过插件来实现的。
- 构建流程：parse -> transfrom -> generator 三步。parse 将源码转为 AST，transform 对 AST 进行转化，generator 将 AST 转化为目标代码，并且生成 sourcemap。
- 什么是 sourcemap？：Sourcemap 本质上是一个信息文件，里面储存着代码转换前后的对应位置信息。它记录了转换压缩后的代码所对应的转换前的源代码位置，是源代码和生产代码的映射。 Sourcemap 解决了在打包过程中，代码经过压缩，去空格以及 babel 编译转化后，由于代码之间差异性过大，造成无法 debug 的问题。

#### babel6 和 babel 7

##### babel6

- babel6 中存在着很多问题，例如 ES 的标准每年都在更新，同一个语法特性在新版本的 ES 中可能属于不同的标准中。

```js
ES的标准
stage0：想法阶段
stage1：值得被提议阶段
stage2：...
stage3：...
stage4：...
```

- 通常我们会在`.babelrc`文件中做 babel 的相关配置，babel6 中则需要手动的去引入很多的**预设**，例如 babel-preset-stage-2\babel-perset-2016 等等，但是今年在 stage-2 中的语法可能明年就被放入到 stage-3 中了，还得需要开发者手动的去更新 babel 配置，就显得非常麻烦。

##### babel7

- babel7 解决了 babel6 的痛点，只需要配置`@babel/preset-env`模块，经过简单的配置，就可以轻松的完成对不同浏览器的兼容。通过动态的引入`polyfill`，从而实现了`boudle size`的最小化。
- [babel 中文文档](https://babel.docschina.org/repl/)可以试一下，不同浏览器中，babel 对 js 代码的转义降级情况。以 async 为例。

#### 箭头函数的细节

- 问：new 一个箭头函数会怎样？
  会发生报错`function is not constructor`因为箭头函数没有 this，所以不能作为构造函数进行实例化。
- 箭头函数中的 this 会被 babel 转义为`void 0`

```js
const fn = () => {
  this.name = '123'
}
-------- 被babel转义为 ------
const fn = () => {
  (void 0).name = '123'
}
```

#### 数组的细节

- 稀松数组`[1,2,,,,4,5]`中的稀松数据项，在 map 遍历时会被自动跳过。

```js
[1, , , , , 2].map((v) => console.log(v));
// 1 2
```

- 手写一个生成器函数

```js
const funsGenerator = (num) =>
  new Array(num).fill(0).map((item) => (funs) => console.log(funs));
funsGenerator(10).forEach((funs, i) => funs(i));
// 输出0~9
// Array.prototype.fill(value, [star, end]) 方法给数组添加数据项。
// 这里fill的目的是给数组添加一个默认的数据项，不然会被map跳过循环。
```

#### 对象的细节

- Object.is(value, value)用于判断两个值是否相同，其底层是运用了 ESnext 底层的`StameValueZero()`方法，进行的比较，ESnext 中很多地方都用到了这个方法，例如 Array.prototype.includes()

```js
+0 === -0; // true
NaN === NaN; // false

Object.is(+0, -0); // false
Object.is(NaN, NaN) // true
  [NaN].includes(NaN); // true
```

- Object.assign()是浅拷贝还是深拷贝？答：第一层是深拷贝，第二层是浅拷贝。

#### Proxy(代理)

- 以及基础的 Proxy

```js
const man = { age: "18", name: "xiaowang" };
const person = new Proxy(man, {
  get(target, propkey, reverse) {
    console.log(target, propkey, reverse);
    Reflect.get(target, propkey, reverse);
  },
  set(target, propkey, reverse) {
    console.log(target, propkey, reverse);
    Reflect.set(target, propkey, reverse);
  },
});
```

#### Reflect

- ESnext 中提出的新的 API，是对 Object 的补充，现阶段一些方法会同时存在于两个 API 中，Reflect 中的方法，更偏向于函数式；Object 中的方法更偏向于命令式：typeOf 0
- Reflect 中减少了抛错，Object 中抛错，Reflect 中返回的是 false。

#### Map、Set、WeekMap、WeekSet

- 这里主要说是说 week
  - 1、键值 key，只能是一个对象。
  - 2、键值 key 所指的对象，不会被 GC（垃圾回收机制）

#### 迭代器 Iterator

- 是一个接口，为不同的数据结构提供统一的访问机制。任何具有`iterator`的数据结构都可以被`for...of`所遍历。其本质是一个`指针`。提供给`for...of`消费。

#### 手写小代码

##### Object.entires()

```js
// generator 的方式
// 入参：obj 出参：arr
function* myEntires(obj) {
  const newObj = { ...obj };
  // 注意哦~ forEach里用yield会报错，因为forEach里传递的是一个函数，yield写在这里并没有作用于当前的myEntires函数，所以会报错
  // Object.keys(newObj).forEach((key, i) => {
  //   yield[(key, newObj[key])];
  // });
  for (let key of Object.keys(newObj)) {
    yield [key, newObj[key]];
  }
}
const test = { a: "11", b: "22", c: "33" };
const result = myEntires(test);
const reason = [];
for (let item of result) {
  reason.push(item);
}
console.log(reason);
// [['a', '11'], ['b', '22'], ['c', '33']]
```

##### Promise.allSettled()

```js
/**
 * allSettled()相对all()不同的地方在于，all()返回的是由于promise成功状态组成的数组，而allSettled()则返回的数组里可以包含成功也可以包含失败的状态。
 */
function allSettled(arr) {
  if (!Array.isArray(arr)) {
    throw Error("请录入一个数组");
  }
  return new Promise((resolve, reject) => {
    const result = [];
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      Promise.resolve(arr[i])
        .then(
          (value) => {
            result[i] = {
              status: "fulfilled",
              value,
            };
          },
          (reason) => {
            result[i] = {
              status: "rejected",
              value: reason,
            };
          }
        )
        .finally(() => {
          ++num === result.length && resolve(result);
        });
    }
  });
}
```
