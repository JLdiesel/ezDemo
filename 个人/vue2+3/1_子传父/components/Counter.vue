<template>
  <div>
    <input type="number" v-model.number="counter" />
    <button @click="increment">+</button>
    <button @click="incrementSingle">+1</button>
    <button @click="decrement">-1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  //数组写法
  //   emits: ["addN", "add", "sub"],
  //对象写法  为了验证参数
  emits: {
    add: null,
    sub: null,
    addN: (number) => {
      if (number > 18) return true;
      return false;
    },
  },
  components: {},
  methods: {
    incrementSingle() {
      console.log(1);
      this.$emit("add");
    },
    increment() {
      console.log(1);
      this.$emit("addN", this.counter);
    },
    decrement() {
      console.log(1);
      this.$emit("sub");
    },
  },
};
</script>
   

<style>
</style>