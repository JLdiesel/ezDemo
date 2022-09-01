import getLastEvent from '../utils/getLastEvent';
import getSelector from '../utils/getSelector';
import onload from '../utils/onload';
import tracker from '../utils/tracker';
export default function () {
  onload(function () {
    let FMP: PerformanceEntry, LCP: PerformanceEntry;
    new PerformanceObserver((entryList, observer) => {
      const perfEntries = entryList.getEntries();
      FMP = perfEntries[0];
      observer.disconnect(); //不再观察
    }).observe({ entryTypes: ['element'] }); //观察页面中有意义的元素
    new PerformanceObserver((entryList, observer) => {
      const perfEntries = entryList.getEntries();
      LCP = perfEntries[0];
      observer.disconnect(); //不再观察
    }).observe({ entryTypes: ['largest-contentful-paint'] }); //观察页面中最大渲染的元素

    new PerformanceObserver((entryList, observer) => {
      //firstInputDelay FID
      let lastEvent = getLastEvent();
      const firstInput = entryList.getEntries()[0];
      console.log('firstInput', firstInput);

      if (firstInput) {
        let inputDelay = (firstInput as any).processingStart - firstInput.startTime; //输入到输入响应的时间
        let duration = firstInput.duration;
        if (inputDelay > 0 || duration > 0) {
          tracker.send({
            kind: 'experience',
            type: 'firstInputDelay',
            inputDelay, //延迟时间
            duration, //处理时间
            startTime: firstInput.startTime,
            selector: lastEvent ? getSelector((lastEvent as any).path) : '',
          });
        }
      }
      observer.disconnect(); //不再观察
    }).observe({ type: 'first-input', buffered: true }); //第一次交互
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
      const FP = performance.getEntriesByName('first-paint')[0];
      const FCP = performance.getEntriesByName('first-contentful-paint')[0];
      tracker.send({
        kind: 'experience',
        type: 'paint',
        firstPaint: FP.startTime,
        firstContentfulPaint: FCP.startTime,
        firstMeaningfulPaint: FMP.startTime,
        largestContentfulPaint: LCP?.startTime,
      });
    }, 4000);
  });
}
