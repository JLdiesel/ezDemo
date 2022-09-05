<template>
  <div class="fixed right-5 bottom-5 left-5 top-5">
    <Editor :data="state" />
  </div>
</template>

<script setup lang="ts">
import Editor from "./packages/editor";
import data from "./data.json";
const state = ref(data);
</script>

<style scoped></style>
