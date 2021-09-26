<template>
  <div>
    <h2>{{ counter }}</h2>
    <h2>{{ dbCounter }}</h2>
    <button @click="increment">++</button>
    <button @click="decrement">--</button>
    <h2>{{ local }}</h2>
  </div>
</template>

<script>
import useCounter from "./hooks/useCounter";
import useTitle from "./hooks/useTitle";
import useLocalStorage from "./hooks/useLocalStorage.js";
export default {
  setup() {
    const { counter, dbCounter, decrement, increment } = useCounter();
    const titleRef = useTitle("我是");
    const local = useLocalStorage("user", { name: "123", age: "66" });
    setTimeout(() => {
      titleRef.value = "金龙";
      local.value = { name: "jl", age: "18" };
    }, 3000);
    return {
      counter,
      dbCounter,
      decrement,
      increment,
      titleRef,
      local,
    };
  },
};
</script>

<style  scoped>
</style>