import onload from '../utils/onload';
import tracker from '../utils/tracker';
export default function () {
  onload(function () {
    let FMP, LCP;
    new PerformanceObserver((entryList, observer) => {
      const perfEntries = entryList.getEntries();
      FMP = perfEntries[0];
      observer.disconnect(); //不再观察
    }).observe({ entryTypes: ['element'] }); //观察页面中有意义的元素
    new PerformanceObserver((entryList, observer) => {
      const perfEntries = entryList.getEntries();
      LCP = perfEntries[0];
      observer.disconnect(); //不再观察
    }).observe({ entryTypes: ['largest-contentful-paint'] }); //观察页面中有意义的元素
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
