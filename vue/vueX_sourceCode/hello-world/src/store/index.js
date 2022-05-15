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
  modules: {}
})