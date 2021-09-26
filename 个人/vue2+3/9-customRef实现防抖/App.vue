<template>
  <div>
    <input v-model="message" />
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
import debunce from "./assets/debunceRef";
export default {
  setup() {
    const message = debunce("hello world");
    return {
      message,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>