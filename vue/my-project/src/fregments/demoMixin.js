export default {
  data: function () {
    return {
      mixinName: 'deomMixin',
      mixinobj: {
        name: '小明',
        age: '100',
        color: 'blue'
      }
    }
  },
  created() {
    console.log('minxinCreated');
  }
}