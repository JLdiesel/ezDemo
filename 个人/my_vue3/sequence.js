function getSequence(arr) {
  const len = arr.length;
  const result = [0];
  const p = arr.slice(0); //最后
  let start, end, resultLastIndex, middle;

  for (let i = 1; i < len; i++) {
    const item = arr[i];
    if (item !== 0) {
      //vue中0为需要新建的dom
      resultLastIndex = result[result.length - 1];
      if (item > arr[resultLastIndex]) {
        result.push(i);
        p[i] = resultLastIndex; //当前放到末尾的要记住前面的索引
        continue;
      }
      //需要通过二分查找在结果集中找到比当前值大的，用当前值的索引将其替换
      start = 0;
      end = result.length - 1;
      while (start < end) {
        middle = (start + end) >> 1;
        if (arr[result[middle]] < item) {
          start = middle + 1;
        } else {
          end = middle;
        }
      }
      //找到中间值后 替换中间值
      if (arr[result[start]] > item) {
        result[end] = i;
        p[i] = result[end - 1];
      }
    }
  }
  let i = result.length;
  let last = result[i - 1]; //找到最后一项
  while (i-- > 0) {
    //倒序回溯
    result[i] = last; //最后一项是确定的
    last = p[last];
  }
  //通过标记索引的方式
  return result;
}
console.log(getSequence([1, 5, 4, 3, 9, 4]));
