<template>
  <div>
    <home :name="name">
      <template #jl>
        <div>金龙</div>
      </template>
      <template v-slot:right>
        <div>右边</div>
      </template>
      <template #[name]>
        <div>动态插槽</div>
      </template>
    </home>
  </div>
</template>

<script>
import { ref } from "vue";
import Home from "./Home.vue";

export default {
  components: {
    Home,
  },
  setup() {
    const name = ref("jl2");
    return {
      name,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>