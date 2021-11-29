/* 
  <el-date-picker
              v-model="date"
              value-format="yyyy-MM"
              type="month"
              placeholder="选择首个生效月份"
              :picker-options="timeOptions"
            >
            </el-date-picker> */
// computed: {
//可禁选今天之前的日期
function timeOptions() {
  const options = {};
  options.disabledDate = (time) => {
    const startTime = new Date().getTime() - 3600 * 1000 * 24 + 1;
    return time.getTime() < startTime;
  };
  return options;
}
//   },
