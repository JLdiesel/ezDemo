<template>
  <div class="step-group">
    <div :class="['step-item', { margin: index }]" v-for="(item, index) in stepList" :key="item">
      <div :class="['step-icon', { 'active-icon': active >= index, 'el-icon-check': active > index }]">
        {{ active <= index ? index + 1 : '' }}
      </div>
      <div :class="['step-title', { 'active-title': active >= index }]">{{ item }}</div>
      <div
        :class="['step-line', { 'active-line': active > index }]"
        :style="{ width: space + 'px' }"
        v-if="index !== stepList.length - 1"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EsignBizSteps',
  props: {
    stepList: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
    space: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
@activeColor: #1890ff;
@disactiveColor: #9ba0a4;
.step-group {
  display: flex;
  justify-content: center;
  .margin {
    margin-left: 5px;
  }
  .step-item {
    display: flex;
    line-height: 24px;
    font-size: 14px;
    .step-icon {
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 20px;
      color: @disactiveColor;
      border: 2px solid @disactiveColor;
      border-radius: 50%;
      &.active-icon {
        color: #fff;
        background-color: @activeColor;
        border: 2px solid @activeColor;
      }
      &.active-icon.el-icon-check {
        background-color: #fff;
        color: @activeColor;
      }
    }
    .step-title {
      margin-left: 4px;
      color: @disactiveColor;
      &.active-title {
        color: @activeColor;
      }
    }
    .step-line {
      align-self: center;
      height: 1px;
      width: 50px;
      background-color: @disactiveColor;
      margin-left: 4px;
      &.active-line {
        background-color: @activeColor;
      }
    }
  }
}
</style>
