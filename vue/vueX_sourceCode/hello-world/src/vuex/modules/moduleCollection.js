import { forEach } from '../util'

// Collection 收集
// 通过递归完成module的收集
export class ModuleCollection{
  constructor(option) {
    // register 注册
    // 递归的注册模块
    this.register([], option)
  }
  register(path, rootModules) {
    let newModule = {
      // row 源
      _row: rootModules,
      _children: [],
      state: rootModules.state
    }
    if (path.length === 0) {
      this.root = newModule
    } else {
      // 按照父子关系嵌套在一起
      // memo 备忘录
      let parent = path.slice(0, -1).reduce((memo, current) => {
        return memo._children[current]
      }, this.root)
      parent._children[path[path.length - 1]] = rootModules
    }
    // 如果包含 modules 则继续递归
    if (rootModules.modules) {
      forEach(rootModules.modules, (module, moduleName) => {
        this.register([...path, moduleName], module)
      })
    }
  }
}