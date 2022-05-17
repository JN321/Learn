import Vue from 'vue'
import Vuex from '../vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '这里是vuex',
    age: 10
  },
  getters: {
    getAge(state) {
      return state.age + 10
    }
  },
  mutations: { // vuex中 唯一可以改变状态的方法。
    changeAge(state, payload) {
      state.age += payload
    }
  },
  actions: { // 通过action发起请求
    changeAge({ commit }, payload) {
      setTimeout(() => {
        commit('changeAge', payload)
      }, 1000)
    }
  },
  // 1、默认模块没有作用域
  // 2、状态不要和模块名重名
  // 3、计算属性getters 可直接通过getters取值
  // 4、增加namespace: true，用于划分命名空间。会将这个模块的属性，封装至该模块下
  // 5、默认会找当前模块上是否有 namespace:true, 并将父级的namespace一同算上，做成命名空间
  // 6、访问{{$store.dispatch('')}}
  modules: {
    a: {
      state: {
        aAge: 100
      },
      action: {
        changeAge() {}
      }
      
    }
  }
})