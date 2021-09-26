<script>
import { ref } from "vue";
import Home from "./Home.vue";
export default {
  setup() {
    const counter = ref(0);
    const increment = () => {
      counter.value++;
    };
    const increments = (val) => {
      counter.value = counter.value - val;
    };
    return () => (
      <div>
        <Home
          increment={() => increment}
          onIncrement={increments}
          count={counter.value}
        />
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
</style>