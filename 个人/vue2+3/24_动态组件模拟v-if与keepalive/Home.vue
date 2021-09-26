<template>
  <div>Home</div>
  <div @click="count++">{{ count }}</div>
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>