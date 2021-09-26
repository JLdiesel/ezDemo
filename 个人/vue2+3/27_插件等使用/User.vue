<template>
  <div>
    <h2>User:{{ $route.params.username }}</h2>
    <h2>id:{{ $route.params.id }}</h2>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  created() {
    console.log(this.$route);
  },
  setup() {
    const router = useRoute();
    console.log(router);
  },
};
</script>

<style scoped>
</style>