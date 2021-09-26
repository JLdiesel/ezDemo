<template>
  <div class="transition">
    <button @click="isshow=!isshow">展示</button>
    <transition name="jl">
      <p v-show="isshow"  class="title" >动画</p>
    </transition>
  </div>
</template>

<script>
  import {ref} from 'vue'
  export default {
    setup() {
      const isshow=ref(false)

      return {isshow}
    }
  }
</script>

<style scoped>

.title{
  display: inline-block;
}
.transition{
  width: 20px;
  margin: 0 auto;
}


  .jl-leave-to,
  .jl-enter-from{
    opacity: 0;
  }
  .jl-leave-active,
  .jl-enter-active{
    transition: opacity 1s ease;
  }
</style>