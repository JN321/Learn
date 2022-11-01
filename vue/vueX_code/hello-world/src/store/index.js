import Vue from 'vue'
import Vuex from '../vuex'

Vue.use(Vuex)

function presists(store) {
  let loacl = localStorage.getItem('VUEX: STATE');
  if (loacl) {
    console.log('loacl', loacl);
    store.replaceState(JSON.parse(loacl))
  }
  // 发布订阅
  store.subscribe((mutation, state) => {
    localStorage.setItem('VUEX: STATE', JSON.stringify(state))
  })
}

export default new Vuex.Store({
  strice: true, // vuex的严格模式 - 此模式下只能通过mutations修改state状态，其他都不可以。
  plugins: [presists],
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
      console.log('age', state.age);
      state.age += payload
    }
  },
  actions: { // 通过action发起请求
    changeAge(store, payload) {
      // console.log('store1', store.commit, payload);
      setTimeout(function () {
        store.commit('changeAge', payload)
      }, 1000)
    }
  },

  // 1、默认模块没有作用域
  // 2、状态不要和模块名重名
  // 3、计算属性 getters 可直接通过 getters 取值
  // 4、增加namespace: true，用于划分命名空间。会将这个模块的属性，封装至该模块下
  // 5、默认会找当前模块上是否有 namespace:true, 并将父级的namespace一同算上，做成命名空间
  modules: {
    a: {
      namespace: true,
      state: {
        name: 'aage'
      },
      mutations: {
        changeName(state, payload) {
          state.name += payload
        }
      },
      modules: {
        c: {
          namespace: true,
          state: {
            name: 'cage'
          },
          mutations: {
            changeName(state, payload) {
              state.name += payload
            }
          }
        },
        e: {
          namespace: true,
          state: {
            name: 'eage'
          },
          mutations: {
            changeName(state, payload) {
              state.name += payload
            }
          }
        },
      }
    },
    d: {
      state: {
        aAge: 'dage'
      },
      actions: {
        changeAge() {}
      },
      modules: {
        f: {
          namespace: true,
          name: {
            aAge: 'fage'
          },
          mutations: {
            changeName(state, payload) {
              state.name += payload
            }
          }
        }
      }
    }
  }
})