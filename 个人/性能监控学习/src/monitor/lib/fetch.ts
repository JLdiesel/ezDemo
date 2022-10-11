import tracker from '../utils/tracker';

export default function () {
  const oldFetch = window.fetch;
  window.fetch = function (url: RequestInfo | URL, options?: RequestInit | undefined) {
    const timestr: number = Date.now();
    const reportData = {
      type: 'fetch',
      method: options?.method,
      duration: 0,
      url,
      timestr,
      req: options?.body ? JSON.stringify(options.body) : '',
      res: '',
      callUrl: '',
      status: '',
    };
    // if (!(url as string).match(/g/)) {
    //   this.logData = { method, url, async };
    // }
    return oldFetch
      .apply(this, [url, options])
      .then(response => {
        reportData.duration = Date.now() - reportData.timestr;
        reportData.callUrl = window.location.href;
        reportData.res = JSON.stringify(response);
        reportData.status = response.status + '-' + response.statusText;
        /*  const isFilterUrl: number = this._options.ignoreUrl.filter(
          (igUrl: string) => igUrl.indexOf(window.location.pathname) > -1,
        )?.length;
        !!isFilterUrl && myEmitter.myEmit('resource', reportData); */
        console.log(reportData);

        return Promise.resolve(response);
      })
      .catch(e => {
        console.log(e);
        reportData.duration = Date.now() - reportData.timestr;
        reportData.callUrl = window.location.href;
        reportData.res = JSON.stringify(e);
        reportData.status = e.status + '-' + e.statusText;

        console.log(reportData);
        // const errorType = ErrorType.httpRequestError;
        // const reqErrorRes: IHttpReqErrorRes = {
        //   requestMethod: this._method,
        //   requestUrl: this._url,
        //   requestData: this._data,
        //   errorMsg: e.message,
        //   errorType
        // };

        // if (!this._isUrlInIgnoreList) {
        //   console.log(`${errorType}: ${this._url}`,)

        // }
        throw new Error(e);
      });
  };
  /*  const oldSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    console.log('send', this);

    if (this.logData) {
      this.addEventListener(
        'loadend',
        () => {
          this.logData.duration = Date.now() - startTime;
          tracker.send({
            ...this.logData,
            req: JSON.stringify(body),
            res: this.response ? JSON.stringify(this.response) : '',
            callUrl: window.location.href,
            status: this.status + '-' + this.statusText,
          });
        },
        false,
      );
      let startTime = Date.now();
      const handler: (
        type: string,
      ) => (this: XMLHttpRequest, ev: ProgressEvent<XMLHttpRequestEventTarget> | Event) => any = type => event => {
        console.log(event, 'event');

        const duration = Date.now() - startTime;
        const status = this.status;
        const statusText = this.statusText;
        tracker.send({
          kind: 'stability',
          type: 'xhr',
          eventType: event.type, //load error abort
          pathname: this.logData.url,
          status: status + '-' + statusText,
          duration,
          response: this.response ? JSON.stringify(this.response) : '',
          params: body || '',
        });
      };
      // this.addEventListener('readystatechange', function () {
      //   console.log('this---------------', this);
      //   if (this.readyState === 4) {
      //     if (this.status >= 200 && this.status < 300) {
      //     }
      //   }
      // });
      // this.addEventListener('load', handler('load'), false)
      //  this.addEventListener('readystatechange', handler('readystatechange'), false)
      // this.addEventListener('error', handler('error'), false)
      // this.addEventListener('loadstart', handler('loadstart'), false)
      // this.addEventListener('loadend', handler('loadend'), false)
      // this.upload.addEventListener('progress', handler('progress'), false)
    }
    return oldSend.apply(this, [body]);
  }; */
}
