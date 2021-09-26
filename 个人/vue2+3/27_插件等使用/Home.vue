<template>
  <div>Homer</div>
  <router-link to="/home/message">{{$store.state.count}}</router-link>
  <router-view />
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>