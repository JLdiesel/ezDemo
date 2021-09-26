<template>
  <div>
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
export default {
  // inheritAttrs: false,
  name: "App",
  components: {
    Home,
  },
  provide: {
    name: "why",
    age: 18,
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>
