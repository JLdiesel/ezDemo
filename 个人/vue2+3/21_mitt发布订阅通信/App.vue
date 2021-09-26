<template>
  <div>
    <home />
    <about v-if="isShow" />
    <button @click="changeShow">改变home</button>
  </div>
</template>

<script>
import About from "./About.vue";
import Home from "./Home.vue";
import { ref } from "vue";
export default {
  components: {
    About,
    Home,
  },
  setup() {
    const isShow = ref(true);
    const changeShow = () => {
      isShow.value = !isShow.value;
    };
    return {
      isShow,
      changeShow,
    };
  },
};

About;
</script>

<style lang="scss" scoped>
</style>