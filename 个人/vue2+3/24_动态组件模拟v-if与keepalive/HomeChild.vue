<template>
  <div>child</div>
  <div @click="count++">{{ count }}</div>
</template>

<script>
export default {
  name: "child",
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>