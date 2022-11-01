const applyMixin = (Vue) => {
  Vue.mixin({
    // 一般插件的混合都在 buefreCreate 中进行
    beforeCreate: vuexInit,
  });
};

// vuex 中 store 的挂载
// 注：这里不能用箭头函数哦~ 箭头函数this指向为undefined
// 组件创建的过程：先父后子
// 目的是让每一个组件都可以通过 this.$store 访问到 vuex。
function vuexInit() {
  // this 指向 Vue 实例
  // 通过 this.$options 获取 vue 实例上的初始化信息
  const options = this.$options;
  // options.store 获取用户配置的 vuex store 实例对象
  if (options.store) {
    // 根组件 - main.js 可以理解为根组件
    this.$store = options.store;
  } else if (options.parent && options.parent.$store) {
    // 子组件 - HelloWrold.vue 可以理解为子组件
    // 有父组件 && 父组件有 $store 则 从父组件继承 $store
    // 子组件中可以访问到组件的 store
    this.$store = options.parent.$store;
  }
}

export default applyMixin;
