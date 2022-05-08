<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1
      @click="
        () => {
          this.num++;
        }
      "
    >
      {{ num }}
    </h1>
    <div v-if="num">if</div>
    <div v-show="num">show</div>
    <div>computed: {{ addNum }}</div>
    <div>------------- 插槽 --------------</div>
    <SlotChild>
      <p>普通插槽{{ slotText }}</p>
      <template v-slot:header>具名插槽{{ header }}</template>
      <!-- 老写法 -->
      <div slot="content" slot-scope="{ slotProps }">
        作用域插槽--{{ slotProps }}
      </div>
      <!-- 新写法 -->
      <!-- <template v-slot:slotProps="slotProps" >作用域插槽{{slotProps}}</template> -->
    </SlotChild>
    <div>---- 过滤器 ----</div>
    {{ money | moneyFilter }}
    <div>----- minxin -----</div>
    <div>这里是mixin - {{ mixinName }}</div>
    <div>{{ mixinobj.name }}-{{ mixinobj.age }}-{{ mixinobj.color }}</div>
    <div>----- extend -----</div>
    <div>{{ baseText }}</div>
  </div>
</template>

<script>
import SlotChild from "./SlotChild";
import demoMixin from "../fregments/demoMixin";
export default {
  name: "HelloWorld",
  mixins: [demoMixin],
  components: {
    SlotChild,
  },
  props: {
    msg: String,
  },
  data: function () {
    return {
      num: 0,
      slotText: "my slot",
      header: "there is header",
      money: 100,
      mixinobj: {
        name: "xiaoming",
        age: "19",
      },
    };
  },
  computed: {
    addNum() {
      return this.num + 1;
    },
  },
  filters: {
    moneyFilter(money) {
      return money > 99 ? "99元" : "1111111";
    },
  },
  created() {
    console.log("created", 1);
    this.$nextTick(() => {
      console.log("nextTick: 1");
    });
  },
  updated() {
    console.log("uptated", 1);
    this.$nextTick(() => {
      console.log("nextTick: 2");
    });
    // this.num ++
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
