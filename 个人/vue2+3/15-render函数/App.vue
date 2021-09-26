<script>
import { h } from "vue";
import Home from "./Home.vue";
export default {
  setup() {},
  render() {
    return h(
      "div",
      {
        class: "123",
        onClick: () => {
          console.log("123");
        },
      },
      [
        h(Home, null, {
          default: () => h("span", null, "666"),
        }),
      ]
    );
  },
};
</script>

