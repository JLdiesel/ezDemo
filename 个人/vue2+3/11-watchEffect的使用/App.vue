<template>
  <div>
    <h2>{{ name }}</h2>
    <h2>{{ age }}</h2>
    <button @click="addAge">123</button>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  setup() {
    const name = ref("jl");
    const age = ref(18);
    //相当于react中的useeffact
    const stop = watchEffect((onInvalidate) => {
      const timer = setTimeout(() => {
        console.log("两秒执行");
      }, 2000);
      //相当于react中的useeffact,参数1相当于return
      onInvalidate(() => {
        clearTimeout(timer);
      });
      console.log("name", name.value, "age:", age.value);
    });
    const addAge = () => {
      age.value++;
      if (age.value > 25) {
        stop();
      }
    };
    return {
      age,
      name,
      addAge,
    };
  },
};
</script>

<style scoped>
</style>