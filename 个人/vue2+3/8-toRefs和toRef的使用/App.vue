<template>
  <div>
    <h2>{{ name }}</h2>
    <h2>{{ names }}</h2>
    <h2>{{ info.name }}</h2>
    <button @click="changeName">changeName</button>
  </div>
</template>

<script>
import { toRef, toRefs, reactive } from "vue";
export default {
  setup() {
    const info = reactive({
      name: "jl",
    });
    //指向的都是同一个内存地址，并不是新的对象，更改一个全部更改
    let names = toRef(info, "name");
    let { name } = toRefs(info);
    const changeName = () => {
      name.value = "lauv";
    };
    return {
      name,
      names,
      info,
      changeName,
    };
  },
};
</script>

<style  scoped>
</style>