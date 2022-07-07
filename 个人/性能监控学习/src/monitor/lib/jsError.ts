import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import tracker from '../utils/tracker'
export default function injectJsError() {
  window.addEventListener('error', function (event) {
    //错误事件对象
    const lastEvent = getLastEvent(); //最后一个交互事件
    const {
      message,
      filename,
      lineno,
      colno,
      error: { stack }
    } = event;
    console.log(event);
    let log = {
      kind: 'stability', //监控指标的大类
      type: 'error', //小类，错误
      errorType: 'jsError', //JS执行错误
      url: '', //哪个路径报错了
      message, //报错信息
      filename, //哪个文件报错了
      position: `${lineno}:${colno}`, //行：列
      stack: getLines(stack),
      selector: lastEvent ? getSelector(lastEvent.path) : '' //代表最后一个操作的元素
    };
    console.log(log);
    tracker.send(log)
  });

  function getLines(stack: string) {
    return stack
      .split('\n')
      .slice(1)
      .map((item) => item.replaceAll(/^\s+at\s+/, ''))
      .join('^');
  }
}
