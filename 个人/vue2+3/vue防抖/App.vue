<template>
  <div>
    <input type="button" value="debounce" @click="debounceLog" />
  </div>
</template>

<script>
function debounce(clickLog, delay) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this[clickLog].apply(this, args);
    }, delay);
  };
}
export default {
  methods: {
    debounceLog: debounce("clickLog", 500),
    clickLog() {
      console.log(this);
    },
  },
};
</script>

<style scoped>
</style>