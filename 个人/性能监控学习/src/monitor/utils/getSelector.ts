function getSelector(path: []) {
  
 return path
    .reverse()
   .filter(element => {
      
      return !(element === document || element === window);
    })
   .map((element: Element) => {
      
      let selector = '';
      if (element.id) {
        return `${element.nodeName.toLowerCase()}#${element.id}`;
      } else if (element.className && typeof element.className === 'string') {
        return `${element.nodeName.toLowerCase()}.${element.className}`;
      } else {
        selector = element.nodeName.toLowerCase();
      }
      return selector;
    }).join(' ')
}

export default function (paths: [] ) {
  if (Array.isArray(paths)) {
    
    return getSelector(paths);
  }
}
