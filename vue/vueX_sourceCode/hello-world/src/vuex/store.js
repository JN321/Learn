import applyMixin from './mixin'

let Vue
// 最终用户拿到的是 Store 的实例，并通过this.$store获取定义的
class Store {
  constructor(options) {
    console.log('options', options);
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