<template>
  <div>
    <h2>{{ readonlyInof.name }}</h2>
    <h2>{{ info.name }}</h2>
    <h2>{{ readonlyInfo2.name }}</h2>
    <h2>{{ info2.name }}</h2>
    <button @click="updateInfo">updateInfo</button>
    <button @click="updateInfo2">updateInfo2</button>
  </div>
</template>

<script>
import { readonly, reactive } from "vue";
export default {
  setup() {
    const info = { name: "jl" };

    const readonlyInof = readonly(info);
    const updateInfo = () => {
      readonlyInof.name = "lhy";
    };
    const info2 = reactive({
      name: "lauv",
    });
    const readonlyInfo2 = readonly(info2);
    const updateInfo2 = () => {
      info2.name = "lhy";
    };
    return {
      info,
      info2,
      readonlyInof,
      readonlyInfo2,
      updateInfo,
      updateInfo2,
    };
  },
};
</script>

<style  scoped>
</style>