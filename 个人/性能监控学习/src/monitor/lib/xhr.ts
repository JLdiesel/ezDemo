import tracker from '../utils/tracker'

export default function () {
  const XMLHttpRequest = window.XMLHttpRequest
  const oldOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (method, url, async: boolean = false) {
    if (!(url as string).match(/g/)) {
      
    this.logData = { method, url, async };
    }
    return oldOpen.apply(this,[method,url,async])
  }
  const oldSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function (body) {
    if (this.logData) {
      let startTime = Date.now()
      const handler:(type:string)=> (this: XMLHttpRequest, ev: ProgressEvent<XMLHttpRequestEventTarget>) => any = (type) => (event) => {
        const duration = Date.now() - startTime
        const status = this.statusText
        const statusText = this.statusText
        tracker.send({
          kind: 'stability',
          type: 'xhr',
          eventType: event.type,//load error abort
          pathname: this.logData.url,
          status: status + '-'+statusText,
          duration:duration,
          response: this.response ? JSON.stringify(this.response) : '',
          params:body||''
        })
      }
      this.addEventListener('load',handler('load'),false)
      this.addEventListener('error',handler('error'),false)
      this.addEventListener('abort',handler('abort'),false)
    }
    return oldSend.apply(this,[body])
  }
}