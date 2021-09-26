<template>
  <div>
    <home-child
      v-model:value="value"
      v-model:title="title"
      @changeValue="changeValue"
    />
  </div>
</template>

<script>
// import Home from "./components/Home.vue";
import HomeChild from "./components/HomeChild.vue";
export default {
  // inheritAttrs: false,
  name: "App",
  data() {
    return {
      value: 0,
      title: "hello",
    };
  },
  components: {
    // Home,
    HomeChild,
  },

  methods: {
    changeValue(value) {
      this.value = value;
    },
  },
};
</script>

<style>
</style>
