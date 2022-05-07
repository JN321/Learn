<template>
  <div class="hello">
    <h3>插槽组件</h3>
    <slot></slot>
    <slot name="header"></slot>
    <slot name="content" :slotProps="slotProps"></slot>
  </div>
</template>

<script>

export default {
  name: 'SlotChild',
  props: {
    msg: String
  },
  data: function() {
    return {
      num: 0,
      slotProps: '子组件自己的数据'
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
