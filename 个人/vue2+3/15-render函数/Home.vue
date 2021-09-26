
<script>
import { h } from "vue";

export default {
  render() {
    return h("div", null, [
      h("h2", null, "hellworld"),
      this.$slots.default
        ? this.$slots.default()
        : h("span", null, "我是helloworld的插槽默认值"),
    ]);
  },
};
</script>

