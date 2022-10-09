import tracker from '../utils/tracker'

export default function () {
  const XMLHttpRequest = window.XMLHttpRequest
  const oldOpen = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function (method, url, async: boolean = false) {
    console.log('open',this);
    
    if (!(url as string).match(/g/)) {

      this.logData = { method, url, async };
    }
    return oldOpen.apply(this, [method, url, async])
  }
  const oldSend = XMLHttpRequest.prototype.send
  XMLHttpRequest.prototype.send = function (body) {
    console.log('send',this);
    if (this.logData) {
      let startTime = Date.now()
      const handler: (type: string) => (this: XMLHttpRequest, ev: ProgressEvent<XMLHttpRequestEventTarget> | Event) => any = (type) => (event) => {
        console.log(event,'event');
        
        const duration = Date.now() - startTime
        const status = this.status
        const statusText = this.statusText
        tracker.send({
          kind: 'stability',
          type: 'xhr',
          eventType:event.type,//load error abort
          pathname: this.logData.url,
          status: status + '-' + statusText,
          duration,
          response: this.response ? JSON.stringify(this.response) : '',
          params: body || ''
        })
      }
      this.addEventListener('load', handler('load'), false)
      // this.addEventListener('readystatechange', handler('readystatechange'), false)
      this.addEventListener('error', handler('error'), false)
      this.addEventListener('loadstart', handler('loadstart'), false)
      this.addEventListener('loadend', handler('loadend'), false)
      this.upload.addEventListener('progress', handler('progress'), false)
    }
    return oldSend.apply(this, [body])
  }
}