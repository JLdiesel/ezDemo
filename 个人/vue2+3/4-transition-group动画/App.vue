<template>
  <button @click="addNum">添加数字</button>
  <button @click="removeNum">删除数字</button>
  <button @click="shuffleNum">洗牌</button>
  <transition-group tag="p" name="jl">
    <span v-for="item in numbers" :key="item" class="item">{{ item }}</span>
  </transition-group>
</template>

<script>
import _ from "lodash";
export default {
  name: "App",
  data() {
    return {
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      maxNum: 10,
    };
  },
  methods: {
    addNum() {
      this.numbers.splice(this.randomIndex(), 0, this.maxNum++);
    },
    removeNum() {
      this.numbers.splice(this.randomIndex(), 1);
      this.maxNum--;
    },
    randomIndex() {
      return Math.floor(Math.random() * this.maxNum);
    },
    shuffleNum() {
      this.numbers = _.shuffle(this.numbers);
    },
  },
};
</script>

<style  scoped>
.item {
  display: inline-block;
  margin-left: 5px;
}
.jl-leave-to,
.jl-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
.jl-enter-active,
.jl-leave-active {
  transition: all 1s ease;
}
.jl-leave-active {
  position: absolute;
}
.jl-move {
  transition: transform 1s ease;
}
</style>