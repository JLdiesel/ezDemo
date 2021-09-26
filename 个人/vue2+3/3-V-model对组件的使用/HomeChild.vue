<template>
  <div>
    <span>{{ value }}</span>
    <span>{{ title }}</span>
    <input v-model="values" />
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
  emits: ["changeValue"],
  computed: {
    values: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("changeValue", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>