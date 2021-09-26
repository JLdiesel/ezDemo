<template>
  <div>
    <h2>{{ count }}</h2>
    <counter @add="addOne" @addN="addN" @sub="subOne" />
  </div>
</template>

<script>
import Counter from "./Counter.vue";

export default {
  components: { Counter },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    addOne() {
      this.count++;
    },
    subOne() {
      this.count--;
    },
    addN(counter) {
      this.count = this.count + counter - 0;
    },
  },
};
</script>

<style>
</style>