<template>
  <div>
    {{ Fcounter }}
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import emiter from "./eventBus";
export default {
  setup() {
    const Fcounter = ref(0);
    const changevalue = (info) => {
      console.log(info);
      Fcounter.value = info;
    };
    onMounted(() => {
      emiter.on("jl", changevalue);
      /*  emiter.on("*", (type, info) => {
        console.log(type, info);
        Fcounter.value = info;
      }); */
    });
    onUnmounted(() => {
      emiter.off("jl", changevalue);
    });
    return {
      Fcounter,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>