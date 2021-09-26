<template>
  <div>
    <div>
      <slot :name="name" />
    </div>
    <div>
      <slot name="jl" />
    </div>
    <div>
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
</style>