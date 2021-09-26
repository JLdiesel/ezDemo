<template>
  <div>
    <h2>{{ name }}</h2>
    <h2>{{ info.name }}</h2>
    <button @click="changeName">changeName</button>
    <button @click="changeName2">changeName2</button>
  </div>
</template>

<script>
import { watch, ref, reactive } from "vue";
export default {
  setup() {
    const info = reactive({
      name: "jl",
      age: 18,
    });
    //监听一个reactive对象，会返回这个对象的proxy引用
    watch(info, (newVal, oldVal) => {
      console.log("newVal", newVal, "oldVal", oldVal);
    });
    //监听reactive对象的结构，会返回这个对象
    watch(
      () => ({ ...info }),
      (newVal, oldVal) => {
        console.log("newVal", newVal, "oldVal", oldVal);
      },
      {
        //深度侦听
        deep: true,
        //立即执行
        immediate: true,
      }
    );
    //监听reactive对象的单个引用，会返回value值
    watch(
      () => info.name,
      (newVal, oldVal) => {
        console.log("newVal", newVal, "oldVal", oldVal);
      }
    );
    const name = ref("lauv");
    //监听ref会返回value值
    watch(name, (newVal, oldVal) => {
      console.log("newVal", newVal, "oldVal", oldVal);
    });
    //监听数组会返回数组，内容为各自单独的返回
    watch([info, name], (newVal, oldVal) => {
      console.log("newVal", newVal, "oldVal", oldVal);
    });
    const changeName = () => {
      info.name = "lauv";
    };
    const changeName2 = () => {
      name.value = "jl";
    };
    return {
      name,
      info,
      changeName,
      changeName2,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>