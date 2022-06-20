<template>
  <el-tabs v-model="state.activeRouter" @tab-remove="removeTab" closable>
    <el-tab-pane v-for="item in state.routers" :label="item" :name="item">
      <template #label>
        <span>{{ item }}</span>
      </template>
      <router-view :name="item"></router-view>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  activePage: {
    type: Number,
    required: true,
  },
  state: {
    type: Object,
    default: () => ({
      activeRouter: 'default',
      routers: [],
    }),
  },
})
const emit = defineEmits(['removeTab', 'changeActiveRouter', 'zeroRouter'])

const removeTab = (val) => {
  const { id, state } = props

  const routers = state.routers.filter((item) => item !== val)
  if (routers.length === 0) {
    emit('zeroRouter', id)
  }
  emit('removeTab', id, routers)
  if (state.activeRouter === val) {
    emit('changeActiveRouter', id, routers[0])
  }
}
</script>

<style lang="scss" scoped></style>
