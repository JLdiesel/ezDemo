<template>
  <div>
    <span>{{value}}</span>
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  props: {
    value: {
      type: Number,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>