<template>
  <div>
    <button
      v-for="(item, index) in list"
      :key="item"
      @click="changeIndex(index)"
    >
      {{ item }}
    </button>
    <keep-alive include="home" exclude="child" max="10">
      <component :is="list[currentIndex]"></component>
    </keep-alive>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import HomeChild from "./components/HomeChild.vue";
export default {
  // inheritAttrs: false,
  name: "App",
  data() {
    return {
      list: ["home", "HomeChild"],
      currentIndex: 0,
    };
  },
  components: {
    Home,
    HomeChild,
  },

  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style>
</style>
