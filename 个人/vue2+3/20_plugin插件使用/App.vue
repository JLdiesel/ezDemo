<template>
  <div></div>
</template>

<script>
import { getCurrentInstance, onMounted } from "vue";
export default {
  created() {
    console.log(this.$name);
  },
  setup() {
    const instance = getCurrentInstance();

    onMounted(() => {
      console.log(instance.appContext.config.globalProperties.$name);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>