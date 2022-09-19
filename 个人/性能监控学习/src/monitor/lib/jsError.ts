import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import tracker from '../utils/tracker'
export default function injectJsError() {
  window.addEventListener('error', function (event) {
    //错误事件对象
    console.log(event)
    const lastEvent = getLastEvent(); //最后一个交互事件
    let log

    if (event.target && (event.target.src || event.target.href)) {
      log = {
        kind: 'stability', //监控指标的大类
        type: 'error', //小类，错误
        errorType: 'resourceError', //JS执行错误
        url: '', //哪个路径报错了
        message: "资源加载错误", //报错信息
        filename: event.target.src, //哪个文件报错了
        tagName: event.target.tagName,
      };
    } else {
      const {
        message,
        filename,
        lineno,
        colno,
        error: { stack }
      } = event;
      log = {
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
    }
    tracker.send(log)

  }, true);
  window.addEventListener('unhandledrejection', (event) => {
    //错误事件对象
    const lastEvent = getLastEvent(); //最后一个交互事件
    const {
      reason
    } = event;
    let message, stack = '', line = 0, column = 0, filename;
    if (typeof reason === 'string') {
      message = reason
    } else if (typeof reason === 'object') {
      if (reason.message) {
        message = reason.message

      }
      if (reason.stack) {
        let matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/)
        filename = matchResult[1];
        line = matchResult[2];
        column = matchResult[3];
        stack = getLines(reason.stack)
      }
    }

    let log = {
      kind: 'stability', //监控指标的大类
      type: 'error', //小类，错误
      errorType: 'promiseError', //JS执行错误
      url: '', //哪个路径报错了
      message, //报错信息
      filename, //哪个文件报错了
      position: `${line}:${column}`, //行：列
      stack,
      selector: lastEvent ? getSelector(lastEvent.path) : '' //代表最后一个操作的元素
    };
    tracker.send(log)
  }, true)
  function getLines(stack: string) {
    return stack
      .split('\n')
      .slice(1)
      .map((item) => item.replaceAll(/^\s+at\s+/g, ''))
      .join('^');
  }
}
