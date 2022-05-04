import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router, // 挂载router 不然 App.vue 中用 <router-view> 会报错。
}).$mount("#app");
