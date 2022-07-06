class SendTracker{
   url: string 
  xhr:XMLHttpRequest
  constructor(url) {
    this.url = ''
    this.xhr=new XMLHttpRequest
  }
  send(data) {
    
  }
}
export default new SendTracker()