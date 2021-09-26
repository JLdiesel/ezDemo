<template>
  <div>
    <h2 ref="title">title12312</h2>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
export default {
  setup() {
    const title = ref(null);
    watchEffect(
      () => {
        console.log(title.value);
      },
      {
        //默认为pre，会在组件挂载之前执行，更改为post之后会在组件挂载后执行,
        //sync会将其强制变为同步执行
        flush: "post",
      }
    );
    return {
      title,
    };
  },
};
</script>

<style scoped>
</style>