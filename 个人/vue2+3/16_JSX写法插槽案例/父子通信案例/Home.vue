<script>
import { ref, watch } from "vue";
export default {
  props: {
    count: {
      type: Number,
    },
    increment: {
      type: Function,
    },
  },
  emits: ["increment"],
  setup(props, context) {
    const emitIncrement = () => {
      console.log(123);
      context.emit("increment", 1);
    };
    const inner = ref("");
    watch(inner, (newval, oldval) => {
      console.log(newval, oldval);
    });
    return () => (
      <div>
        <button onClick={props.increment()}>+1</button>
        <button onClick={emitIncrement}>-1</button>
        <input type="text" v-model={inner.value} />
        <h2 v-text={inner.value}></h2>
        {props.count}
      </div>
    );
  },
};
</script>