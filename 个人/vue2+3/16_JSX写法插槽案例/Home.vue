
<script>
export default {
  render() {
    return (
      <div>{this.$slots.default ? this.$slots.default() : <h2>123455</h2>}</div>
    );
  },
};
</script>

