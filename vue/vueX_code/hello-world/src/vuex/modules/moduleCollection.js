import {
  forEach
} from '../util'
import {
  Module
} from './module'

// Collection 收集
// 通过递归完成module的收集

/**
 * 基础版本 - 未抽离模块
 * 需要将 newModule 以及添加节点、找节点的功能抽离出去
 *  */
// export class ModuleCollection{
//   constructor(option) {
//     // register 注册
//     // 递归的注册模块
//     this.register([], option)
//   }
//   register(path, rootModules) {
//     // 最终形成的树结构的树节点
//     let newModule = {
//       // row 源
//       _row: rootModules,
//       _children: {},
//       state: rootModules.state
//     }
//     if (path.length === 0) {
//       this.root = newModule
//     } else {
//       // 按照父子关系嵌套在一起
//       // memo 备忘录
//       let parent = path.slice(0, -1).reduce((memo, current) => {
//         return memo._children[current]
//       }, this.root)
//       parent._children[path[path.length - 1]] = newModule
//     }
//     // 如果包含 modules 则继续递归
//     if (rootModules.modules) {
//       forEach(rootModules.modules, (module, moduleName) => {
//         this.register([...path, moduleName], module)
//       })
//     }
//   }
// }

/**
 * 进阶版本 - 抽离的module
 * 将 newModule 以及添加节点、找节点的功能抽离出去
 * */
export class ModuleCollection {
  constructor(option) {
    // register 注册
    // 递归的注册模块
    this.register([], option)
  }
  register(path, rootModules) {
    // 最终形成的树结构的树节点
    let newModule = new Module(rootModules)
    if (path.length === 0) {
      this.root = newModule
    } else {
      // 按照父子关系嵌套在一起 - 将子元素添加至父元素中
      // memo 备忘录
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo.getChild(current)
      }, this.root)
      parent.addChild(path[path.length - 1], newModule)
    }
    // 如果包含 modules 则继续递归
    if (rootModules.modules) {
      forEach(rootModules.modules, (module, moduleName) => {
        this.register([...path, moduleName], module)
      })
    }
  }
  getNameSpace(path) {
    let root = this.root;
    return path.reduce((namespace, key) => {
      // 找出当前的模块
      root = root.getChild(key)
      return namespace + (root?.namespaced ? `${key}/` : '')
    }, '')
  }
}