import applyMixin from './mixin'
import {forEach} from './util'

let Vue
// 最终用户拿到的是 Store 的实例，并通过this.$store获取定义的
class Store {
  constructor(options) {
    console.log('options', options);
    // 如果这里直接对this.state赋值，则无法实现state的响应式，那如何实现数据的响应式呢？
    // 通过 new Vue的实例，对实例赋值state
    let state = options.state

    this.getters = {}
    const computed = {}
    forEach(options.getters, (fn, key) => {
      computed[key] = () => fn(this.state)
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key]
      })
    })

    this._vm = new Vue({
      data: {
        // vue state的特点：通过$xxx定义的属性，为内部属性，无法通过实例取到
        // 在vuex中，通过$$xxx定义
        // 如何获取 vue 上的内部属性呢？通过 this._data.$xxx 获取。
        $$state: state
      },
      computed // 计算属性可以将属性放到实例上 例如：computed:{ a:'111' }, 可以直接通过this._vm.a获取
    })

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