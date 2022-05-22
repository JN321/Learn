<template>
  <div class="hello">
    <div>{{ title }}</div>
    <div>--------- state ------------</div>
    <div>{{ $store.state.name }}</div>
    <div>{{ $store.state.age }}</div>
    <div>----------getters-----------</div>
    <div>{{ $store.getters.getAge }}</div>
    <div>--------- mutation 通过commit调用 ----------</div>
    <button @click="$store.commit('changeAge', 5)">同步状态更新</button>
    <div>--------- action 通过 dispatch 调用 -----------</div>
    <button @click="$store.dispatch('changeAge', 10)">异步状态更新</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => {
    return {
      title: "vuex源码实现",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
