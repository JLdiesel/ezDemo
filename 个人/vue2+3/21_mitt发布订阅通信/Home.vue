<template>
  <div>
    <h2>{{ counter }}</h2>
    <button @click="btnClick">按钮点击</button>
  </div>
</template>

<script>
import emitter from "./eventBus";
import { ref } from "vue";
export default {
  setup() {
    const counter = ref(0);
    const btnClick = () => {
      counter.value++;
      emitter.emit("jl", counter.value);
    };
    return {
      btnClick,
      counter,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>