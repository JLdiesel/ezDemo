<template>
  <div>
    <h2>{{ fullName }}</h2>
    <h2>{{ fullName2 }}</h2>
    <button @click="changeName">changeName</button>
  </div>
</template>

<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const firstName = ref("jl");
    const lastName = ref("diesel");
    //传入一个函数，此时的fullName是只读的Ref对象
    const fullName = computed(() => firstName.value + " " + lastName.value);
    //传入一个对象，如果有set会执行set的逻辑，没有set如果想更改funllName会报错
    const fullName2 = computed({
      get: () => firstName.value + " " + lastName.value,
      set(newvalue) {
        const names = newvalue.split(" ");
        firstName.value = names[0];
        lastName.value = names[1];
      },
    });
    const changeName = () => {
      // firstName.value = "lauv";
      // lastName.value = "hy";
      // fullName.value = "lauv hy";
      fullName2.value = "lauv hy";
    };
    return {
      fullName,
      fullName2,
      changeName,
    };
  },
};
</script>

<style scoped>
</style>