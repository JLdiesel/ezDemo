import tracker from "../utils/tracker";
import onload from '../utils/onload'
export default function () {
  const wrapperElements=['html','body','#container','.content']
  let emptyPoints = 0
  function getSelector(element: Element) {
    if (element.id) {
      return '#'+element.id
    } else if (element.className) {
      return '.'+element.className.split(' ').filter(Boolean).join('.')
    }else{
      return element.nodeName.toLowerCase()
    }
  }
  function isWrapper(element:Element) {
    let selector = getSelector(element);
    if (~wrapperElements.indexOf(selector)) {
      console.log(selector);
      
      emptyPoints++
    }
  }
 
  onload(() => {
    console.log('load');
  for (let i = 1; i <= 9; i++) {
    const xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2);
    const yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10);
    isWrapper(xElements[0])
    isWrapper(yElements[0])
  }
  if (emptyPoints >=15) {
    let centerElements=document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
    tracker.send({
      kind: 'stability',
      type: 'blank',
      emptyPoints,
      screen: window.screen.width + 'X' + window.screen.height,
      viewPoint: window.innerWidth + 'X' + window.innerHeight,
      selector:getSelector(centerElements[0])
    })
  }
  })
}