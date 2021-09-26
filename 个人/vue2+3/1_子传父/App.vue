<template>
  <div>
    <show-message title="123" content="456" />
    <show-message :title="title" :content="content" />
    <show-message :="message" />
    <show-message class="hello" />
    <!-- <counter /> -->
    <count-emit />
  </div>
</template>

<script>
import CountEmit from "./components/CountEmit.vue";
// import Counter from "./components/Counter.vue";

import ShowMessage from "./components/ShowMessage.vue";

export default {
  // inheritAttrs: false,
  name: "App",
  components: {
    ShowMessage,
    CountEmit,
  },
  data() {
    return {
      title: "123",
      content: "456",
      message: {
        title: "你好啊",
        content: "我是jl",
      },
    };
  },
};
</script>

<style>
</style>
