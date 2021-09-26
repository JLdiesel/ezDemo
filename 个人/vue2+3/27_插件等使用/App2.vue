
<template>
  <div>
    <input type="text" v-model="counter" />
    <h2 v-format-time="'YYYY/MM/DD'">{{ time }}</h2>
    <h2 v-format-time>{{ time }}</h2>
    <h2>{{ $store.state.count }}</h2>
    <h2>{{ $store.state.home.count }}</h2>
    <h2>{{ $store.state.about.count }}</h2>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let time = 1234567890;
    const counter = ref("");
    return {
      counter,
      time,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>