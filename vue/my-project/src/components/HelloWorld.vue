<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1 @click="() => {this.num++}">{{ num }}</h1>
    <div v-if="num">if</div>
    <div v-show="num" >show</div>
    <div>computed: {{addNum}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return {
      num: 0
    }
  },
  computed: {
    addNum () {
      return this.num + 1
    }
  },
  created() {
    console.log('created', 1);
    this.$nextTick(() => {
      console.log('nextTick: 1');
    })
  },
  updated() {
    console.log('uptated', 1);
    this.$nextTick(() => {
      console.log('nextTick: 2');
    })
    // this.num ++ 
  }
}
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
