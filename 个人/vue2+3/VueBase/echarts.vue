<template>
  <div class="dashboard">
    <h2 ref="divRef" :style="{ width: '500px', height: '500px' }">dashboard</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import * as echarts from 'echarts';
export default defineComponent({
  name: 'dashboard',
  setup() {
    const divRef = ref<HTMLElement>();
    onMounted(() => {
      //初始化echarts实例
      const echartInstance = echarts.init(divRef.value!, 'light', {
        renderer: 'svg'
      });
      // const options = ;
      //编写配置
      echartInstance.setOption({
        title: {
          text: '用户数量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross' //shadow 阴影 cross 十字
          }
        },
        legend: { data: ['销量'] },
        xAxis: { data: ['衬衫', '羊毛衫', '雪纺衫'] },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar', //pie为饼状图 bar为柱状图 line map candle
            data: [5, 20, 36]
          }
        ]
      });
    });

    return { divRef };
  }
});
</script>

<style scoped></style>
