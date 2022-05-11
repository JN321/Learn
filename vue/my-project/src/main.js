import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index"

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router, // 挂载router 不然 App.vue 中用 <router-view> 会报错。
  store
}).$mount("#app");

const baseData = {
  data: function() {
    return {
      baseText: 'hello extend'
    }
  },
  created() {
    console.log('这里是baseData');
  }
}
const exampleBaseDate = Vue.extend(baseData)
new exampleBaseDate({
  created() {
    console.log('这里是exampleBaseDate');
  }
})
