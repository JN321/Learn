const applyMixin = (Vue) => {
  Vue.mixin({
    // 一般插件的混合都在buefreCreate中进行
    beforeCreate: vuexInit
  })
}

// vuex 的初始化
// 注：这里不能用箭头函数哦~ 箭头函数this指向为undefined
// this 指向vue实例
// 组件的创建过程：先父后子
function vuexInit() {
  const options = this.$options
  if (options.store) {
    // 根组件 - main.js可以理解为根组件
    this.$store = options.store
  } else if ( options.parent &&  options.parent.$store ) {
    // 子组件 - HelloWrold.vue可以理解为子组件
    // 有父组件 && 父组件有$store 则 从父组件继承$store
    // 子组件中可以访问到this.$store
    this.$store = options.parent.$store
  }
  console.log('this：', this, this.$options);
}

export default applyMixin