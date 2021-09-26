<template>
  <div>
    <h2>reactive中的counter{{ state.counter }}</h2>
    <h2>Ref中的counter{{ content }}</h2>
    <button @click="increment">incrementCount</button>
    <button @click="decrement">decrementContent</button>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "app",
  setup() {
    let state = reactive({
      counter: 100,
    });
    let content = ref(50);
    const increment = () => {
      state.counter++;
    };

    const decrement = () => {
      content.value--;
    };
    return {
      state,
      content,
      increment,
      decrement,
    };
  },
};
</script>

<style scoped>
</style>