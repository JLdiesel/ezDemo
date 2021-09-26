<template>
  <div>
    child
    {{ name }}-
    {{ age }}
  </div>
</template>

<script>
export default {
  inject: ["name", "age"],
};
</script>

<style lang="scss" scoped>
</style>