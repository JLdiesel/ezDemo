const userAgent=require('user-agent')
function getExtraData() {
  
  return {
    title: document.title,
    url: location.href,
    timestamp: Date.now(),
    userAgent:userAgent.parse(navigator.userAgent)
  }
}

class SendTracker{
  xhr:XMLHttpRequest
  constructor(public url:string) {
    this.xhr=new XMLHttpRequest
  }
  send(data:Partial< Record<string,any>>={}) {
    let extraData = getExtraData();
    const log = { ...data, ...extraData }
      console.log(log);
      
  }
}
export default new SendTracker('')