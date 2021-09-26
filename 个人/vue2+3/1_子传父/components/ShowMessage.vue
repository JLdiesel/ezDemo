<template>
  <div>
    {{ title }}
    <div>{{ content }}</div>
    <div>{{ user.name }}</div>
    <div>{{ user.age }}</div>
    <div :class="$attrs.class"></div>
    <div :="$attrs"></div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "ShowMessage",
  // props: ["title", "content"],
  data() {
    return {
      count:0
    }
  },
  props: {
    title: { type: String, default: "123" },
    content: { type: String, required: true },
    user: {
      type: Object,
      default() {
        return {
          name: "金龙",
          age: 18,
        };
      },
    },
  },
};
</script>

<style scoped>
</style>