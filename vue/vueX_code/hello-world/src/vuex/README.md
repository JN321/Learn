- [思维图](https://www.processon.com/mindmap/627fc41a6376890bfe64d392)
- vuex 实现的简易版本
- store_base.js 实现了 state、getters、action、mutation功能
  > - 1、`vue.use(Vuex)` 会调用 vuex 中定义的`install()`方法。

- store_modules.js 实现了 modules 功能
  > - 1、通过递归实现了modules的收集，将用户录入的modules内容，转化为更好理解的树状结构
  > - 2、安装模块，将模块中的属性(state\getters\action\mutation)，定义在 Store 中.