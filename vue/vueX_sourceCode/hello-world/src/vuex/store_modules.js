/**
 * 实现了vuex中的modules功能
 * - 通过 ModuleCollection类 中的 递归实现了modules的收集，将用户录入的modules内容，转化为更好理解的树状结构
 */

import applyMixin from './mixin'
import { ModuleCollection } from './modules/moduleCollection'

let Vue
/**
 *  1、收集模块转换 为一棵树
 *  2、安装模块，将模块中的属性，定义在 store 中
 */
class Store {
  constructor(options) {
    // Collection 收集
    // 1、收集模块 转换  为一棵树
    this._modules = new ModuleCollection(options)
    console.log('this._modules ', this._modules );
    // 2、安装模块，将模块中的属性，定义在 store 中
    // installModuls()
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