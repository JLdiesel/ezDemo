<template>
  <div>
    <input type="text" v-focus:nmsl.lazy v-model="counter" />
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const counter = ref("");
    return {
      counter,
    };
  },
  directives: {
    focus: {
      //el当前元素   bindings :nmsl.lazy等 vnode当前虚拟节点 preVnode前虚拟节点
      created() {
        console.log("created");
      },
      beforeMount() {
        console.log("beforeMount");
      },
      mounted(el, bindings, vnode, preVnode) {
        el.focus();
        console.log(el, preVnode);
        console.log(bindings);
        console.log("mounted");
      },

      beforeUpdate() {
        console.log("beforeUpdate");
      },
      updated(el, bindings, vnode, preVnode) {
        console.log(vnode, preVnode);
        console.log("updated");
      },
      beforeUnmount() {
        console.log("beforeUnmount");
      },
      unmounted() {
        console.log("unmounted");
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>