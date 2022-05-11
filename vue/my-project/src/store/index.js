import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    nodeInfor1: {
      name: 'hello vuex1',
      size: '100'
    },
    nodeInfor2: {
      name: 'hello vuex2',
      size: '100'
    }
  },
  mutations: {
    SET_NODE_INFOR(state, { value }) {
      state.nodeInfor1 = value
    }
  },
  actions: {
    setNodeInfor({commit}, value) {
      commit('SET_NODE_INFOR', { value })

    }
  }
})

export default store