<template>
  <div id="app">
    {{count}}
    <button @click="add">add</button>
  </div>
</template>

<script >
import {ref,defineComponent} from 'vue'
export default defineComponent({
  setup () {
    const count=ref(0);
    function add(){
      count.value++
    }
    return {count,add}
  }
})
</script>
