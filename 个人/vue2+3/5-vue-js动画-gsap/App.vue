<template>
  <div>
    <input v-model="keyWords" />
    <transition-group
      tag="ul"
      name="jl"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <li v-for="(item, index) in showNames" :key="item" :data-index="index">
        {{ item }}
      </li>
    </transition-group>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  name: "App",
  data() {
    return {
      names: ["asb", "jl", "abc", "ccc", "babb", "bbb", "lauv", "jim"],
      keyWords: "",
    };
  },
  computed: {
    showNames() {
      return this.names.filter((item) => item.indexOf(this.keyWords) !== -1);
    },
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: 1,
        height: "1.5em",
        delay: el.dataset.index * 0.5,
        onComplete: done,
      });
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        height: 0,
        delay: el.dataset.index * 0.5,
        onComplete: done,
      });
    },
  },
};
</script>

<style  scoped>
</style>