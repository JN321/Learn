/**
 * 实现了vuex中的modules功能
 * - 通过 ModuleCollection类 中的 递归实现了modules的收集，将用户录入的modules内容，转化为更好理解的树状结构
 */

import applyMixin from './mixin'
import {
  ModuleCollection
} from './modules/moduleCollection'
import {
  forEach
} from './util'

function getState(store, path) {
  return path.reduce((newState, current) => {
    return newState[current]
  }, store.state)
}

function installModuls(store, state, path, module) {
  // ------- 处理namespace 命名空间 -------
  // 注册事件时，需要注册到对应的命名中间中，这里的path指的就是所有的路径，我们根据path计算出一个命名空间
  // 计算出命名空间后 后续 getters、mutations、actions 的key都需要带上namespace了
  const namespace = store._modules.getNameSpace(path)
  console.log('namespace', namespace);

  // --------- 处理 state --------------
  // 通过 path 判断是否是子模块，需要将子模块的state加入到父模块的state中，形成能够体现父子关系的 state。
  if (path.length > 0) {
    // 非根节点
    // 这里再多看看，还是不够理解 ！！！！！！
    let parent = path.slice(0, -1).reduce((memo, current) => {
      return memo[current]
    }, state) || state

    // 添加响应式的数据
    Vue.set(parent, path[path.length - 1], module.state)
  }

  // --------- 处理 mutations ----------
  /**
   * 思路：将模块中的 mutations 添加至 store.mutations
   * 注意：不同的模块中 mutations 的函数名可能会存在同名的情况，如何处理呢？
   *   - 通过赋值为数组 ！！！
   *   - 例如 不同的module中都存在 " changeAge " 的mutations函数，可以在store.mutations中设为
   *   - { changeAge: [fn, fn, fn] } 这样就避免的函数因同名被覆盖的问题
   */
  module.foreachMutations((mutation, key) => {
    if (!store._mutations[namespace + key]) {
      store._mutations[namespace + key] = []
    }
    // 这里为啥不直接push( mutation )? 1、便于传 payload；2、便于在函数中写自己的逻辑
    store._mutations[namespace + key].push((payload) => {
      // 执行mutation
      // 这里形成了闭包，如果始终用的是 module.state，只能获取到老数据
      // 那在状态更新后，无法获取到最新的数据 
      // 那如何获取到最新的状态呢？去当前的store中获取一下最新的状态，写一个 getState()
      // mutation.call(store, module.state, payload)
      console.log('getState', getState(store, path), path);
      mutation.call(store, getState(store, path), payload)
      // plugins 相关的功能 调用订阅事件 重新执行
      store._subscribers.forEach(sub => sub({
        mutation,
        key
      }, store.state))
    })
  })

  // --------- 处理 actions ------------
  // 和 mutation 逻辑相同
  module.foreachActions((action, key) => {
    if (!store._actions[namespace + key]) {
      store._actions[namespace + key] = []
    }
    store._actions[namespace + key].push((payload) => {
      console.log('store', store);
      action.call(store, store, payload)
    })
  })

  // --------- 处理 getters ------------
  // getters 同名会被覆盖，这点和mutations和actions不同
  // 模块中的getters，都会被定义在store.getters上
  module.foreachGetters((getters, key) => {
    store._wrapperGetters[namespace + key] = () => {
      return getters(module.state)
    }
  })

  // ------- 递归处理 child -------------
  // 如果包含了 child 则递归处理 installModuls
  module.foreachChild((child, childName) => {
    installModuls(store, state, path.concat(childName), child)
  })
}

function resetStoreVm(store, state) {
  // 配置响应式的 state 和 getters
  const wrapperGetters = store._wrapperGetters
  const computed = {}
  store.getters = {}
  forEach(wrapperGetters, (getterFn, key) => {
    // 通过 computed 实现缓存效果
    computed[key] = function () {
      return getterFn()
    }
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    })
  })
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
}

let Vue
/**
 *  1、收集模块转换 为一棵树
 *  2、安装模块，将模块中的属性，定义在 store 中
 */
class Store {
  constructor(options) {
    // Collection 收集
    // --------------- 1、收集模块 => 树 便于理解和后续的处理 ------------
    this._modules = new ModuleCollection(options)
    // console.log('this._modules ', this._modules);

    // ----------- 2、安装模块，将模块中的属性，定义在 store 中。------------
    this._mutations = {}
    this._actions = {}
    this._wrapperGetters = {} // wrapper 包裹
    const state = this._modules.root.state
    installModuls(this, state, [], this._modules.root)
    this._subscribers = []
    // console.log('_mutations', this._mutations);
    // console.log('_actions', this._actions);
    // console.log('_wrapperGetters', this._wrapperGetters);

    // ----- 通过上述操作得到了state、getters。如何实现响应式的数据呢？---------
    resetStoreVm(this, state)

    // ----- 插件相关 ------
    // vuex 中，每一个插件都是一个函数，这里循环的去执行插件函数
    options.plugins.forEach(plugins => plugins(this))
  }
  commit(type, payload) {
    console.log('this._mutations', this);
    this._mutations[type].forEach(fn => fn(payload))
  }
  dispatch(type, payload) {
    this._actions[type].forEach(fn => fn(payload))
  }
  subscribe(fn) {
    this._subscribers.push(fn)
  }
  replaceState(data) {
    this._vm._data.$$state = data
  }
  get state() {
    return this._vm._data.$$state
  }

}

const install = (_Vue) => {
  Vue = _Vue
  // console.log('Vue: ', Vue);
  applyMixin(Vue)
}

export {
  Store,
  install
}