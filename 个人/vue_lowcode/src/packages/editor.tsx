export default defineComponent({
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup({ data }) {
    return () => (
      <div class="w-full h-full ">
        <div class="absolute bg-red w-200px left-0 top-0 bottom-0">
          左侧物料区
        </div>
        <div class="">菜单栏</div>
        <div class="absolute bg-red w-200px right-0 top-0 bottom-0  ">
          属性控制
        </div>
        <div>
          {/* 负责产生滚动条 */}
          <div>
            {/* 产生内容区域 */}
            <div>内容</div>
          </div>
        </div>
      </div>
    );
  },
});
