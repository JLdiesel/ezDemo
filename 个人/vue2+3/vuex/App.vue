<template>
  <div id="app">
   <h2>{{$store.state.count}}</h2>
   <button @click="addcount">+</button>
    <button @click="subcount">-</button>
    <div>----------变化后的count----------</div>
    <h2>{{$store.getters.powerCount}}</h2>
    <div>--------组件中的count------------</div>
    <HelloWorld/>
  </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld'
export default {
    name:'App',
    components:{
        HelloWorld
    },
    methods: {
        addcount(){
            this.$store.commit('increment')
        },
        subcount(){
              this.$store.commit('decrement')
        }
        
        },
}
</script>
<style >

</style>
