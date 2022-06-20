<template>
  <div class="app">
    <el-menu class="el-menu-vertical-demo" text-color="#b7bdc3" @select="clickItem" active-text-color="#0a60bd">
      <el-menu-item index="left">left</el-menu-item>
      <el-menu-item index="right">right</el-menu-item>
      <el-menu-item index="default">default</el-menu-item>
    </el-menu>
    <div v-for="pageId in pages">
      <MainContainer
        :id="pageId"
        :key="pageId"
        @removeTab="removeTab"
        :activePage="activePage"
        @click="clickRouter(pageId)"
        :state="mapState[pageId]"
        @changeActiveRouter="changeActiveRouter"
      />
    </div>
    <el-button @click="pages++">+++</el-button>
  </div>
</template>

<script setup>
import MainContainer from './view/mainContainer.vue'
import { ref, reactive, watch } from 'vue'
const mapState = reactive({
  1: { routers: ['default'], activeRouter: 'default' },
})
const activePage = ref(1)
const pages = ref(1)
const activeRouter = ref('default')
let activeRouters = []
const clickRouter = (item) => {
  activePage.value = item
}
const removeTab = (id, routers) => {
  mapState[id].routers = routers
}
const clickItem = (val) => {
  const { routers } = mapState[activePage.value]
  if (!routers.includes(val)) {
    routers.push(val)
  }
  mapState[activePage.value].activeRouter = val
}
const changeActiveRouter = (id, router) => {
  console.log(id, router)
  mapState[id].activeRouter = router
}
watch(pages, (val, oldVal) => {
  if (val > oldVal) {
    activePage.value = val
    mapState[val] = {
      routers: [activeRouter.value],
      activeRouter: activeRouter.value,
    }
  }
})
watch(activePage, (val) => {
  activeRouters = mapState[val].routers
})
</script>
