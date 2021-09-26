<script>
import { ref } from "vue";
import Home from "./Home.vue";
export default {
  setup() {
    const counter = ref(0);
    return {
      counter,
    };
  },
  render() {
    return (
      <div>
        hellow{this.counter}
        <Home>
          {{ default: () => <h2>你好啊</h2> }}
          </Home>
      </div>
    );
  },
};
</script>