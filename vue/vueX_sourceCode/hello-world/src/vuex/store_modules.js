/**
 * 实现了vuex中的modules功能
 * - 通过 ModuleCollection类 中的 递归实现了modules的收集，将用户录入的modules内容，转化为更好理解的树状结构
 */

import applyMixin from './mixin'

let Vue
class Store {
  constructor(options) {
    // Collection 收集
    this._modules = new ModuleCollection(options)
  }
  
}

const install = (_Vue) => {
  Vue = _Vue
  console.log('Vue: ', Vue);
  applyMixin(Vue)
}

export {
  Store,install
}