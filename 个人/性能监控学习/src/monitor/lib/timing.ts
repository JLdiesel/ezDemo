import onload from '../utils/onload';
import tracker from '../utils/tracker';
export default function () {
  onload(function () {
    setTimeout(() => {
      console.log(window.performance.getEntriesByType('navigation')[0]);
      const {
        fetchStart,
        connectEnd,
        connectStart,
        requestStart,
        responseStart,
        responseEnd,
        domContentLoadedEventEnd,
        domContentLoadedEventStart,
        domInteractive,
        loadEventStart,
        domComplete,
      } = window.performance.getEntriesByType('navigation')[0] as any;

      tracker.send({
        kind: 'experience',
        type: 'timing',
        connectTime: connectEnd - connectStart, //连接时间
        ttfbTime: responseStart - requestStart, //首字节到达时间
        responseTime: responseEnd - responseStart, //响应的读取时间
        parseDOMTime: loadEventStart - domComplete, //DOM解析的时间
        domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart,
        timeToInteractive: domInteractive - fetchStart, //首次可交互时间
        loadTime: loadEventStart - fetchStart, //完整的加载时间
      });
    }, 3000);
  });
}
