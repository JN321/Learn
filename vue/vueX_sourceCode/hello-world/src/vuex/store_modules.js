/**
 * 实现了vuex中的modules功能
 * - 通过 ModuleCollection类 中的 递归实现了modules的收集，将用户录入的modules内容，转化为更好理解的树状结构
 */

import applyMixin from './mixin'
import { ModuleCollection } from './modules/moduleCollection'
import { forEach } from './util'

function installModuls(store, state, path, module) {
  // --------- 处理 state --------------
  // 通过 path 判断是否是子模块，需要将子模块的state加入到父模块的state中，形成能够体现父子关系的 state。
  if ( path.length > 0 ) {
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
    if (!store._mutations[key]) {
      store._mutations[key] = []
    }
    // 这里为啥不直接push( mutation )? 1、便于传 payload；2、便于在函数中写自己的逻辑
    store._mutations[key].push((payload) => {
      mutation.call(store ,state, payload)
    })
  })

  // --------- 处理 actions ------------
  // 和 mutation 逻辑相同
  module.foreachActions((action, key) => {
    if ( !store._actions[key] ) {
      store._actions[key] = []
    }
    store._actions[key].push((payload) => {
      action.call(store, store, payload)
    })
  })

  // --------- 处理 getters ------------
  // getters 同名会被覆盖，这点和mutations和actions不同
  // 模块中的getters，都会被定义在store.getters上
  module.foreachGetters((getters, key) => {
    store._wrapperGetters[key] = () => {
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
    computed[key] = function () {
      return getterFn()
    }
    Object.defineProperty(store.getters, key, {
      get:() =>  store._vm[key]
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
    // --------------- 1、收集模块 => 树 ------------
    this._modules = new ModuleCollection(options)
    console.log('this._modules ', this._modules );

    // ----------- 2、安装模块，将模块中的属性，定义在 store 中。------------
    this._mutations = {}
    this._actions = {}
    this._wrapperGetters = {} // wrapper 包裹
    const state = this._modules.root.state
    installModuls(this, state, [] , this._modules.root)
    console.log('state', state);

    // ----- 通过上述操作得到了state、getters。如何实现响应式的数据呢？---------
    resetStoreVm(this, state)
  }

  commit(type, payload) {
    this._mutations[type].forEach(fn => fn(payload))
  }
  dispatch(type, payload) {
    this._actions[type].forEach(fn => fn(payload))
  }

  get state() {
    return this._vm._data.$$state
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