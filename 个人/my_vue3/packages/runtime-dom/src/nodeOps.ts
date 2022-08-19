export const nodeOps = {
  //插入
  insert: (child: Node, parent: Node, anchor: any) => {
    parent.insertBefore(child, anchor || null);
  },
  //删除
  remove: (child: Node) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  //新建
  createElement: (
    tag: string,
    isSVG: any,
    is: any,
    props: { multiple: null }
  ) => {
    return document.createElement(tag);
  },
  createText: (text: string) => document.createTextNode(text),
  createComment: (text: string) => document.createComment(text),
  setText: (node: Node, text: string) => {
    node.nodeValue = text;
  },
  setElementText: (el: Element, text: string) => {
    el.textContent = text;
  },
  parentNode: (node: Node) => node.parentNode,
  nextSibling: (node: Node) => node.nextSibling,
  querySelector: (selector: any) => document.querySelector(selector),
  setScopeId(el: { setAttribute: (arg0: any, arg1: string) => void }, id: any) {
    el.setAttribute(id, '');
  },
  cloneNode(el: Node) {
    const cloned = el.cloneNode(true);

    if (`_value` in el) {
      (cloned as any)._value = (el as any)._value;
    }
    return cloned;
  }
  // insertStaticContent(
  //   content: any,
  //   parent: {
  //     lastChild: any;
  //     insertBefore: (arg0: any, arg1: any) => void;
  //     firstChild: any;
  //   },
  //   anchor: { previousSibling: any },
  //   isSVG: any,
  //   start: { nextSibling: any; cloneNode: (arg0: boolean) => any },
  //   end: any
  // ) {
  //   const before = anchor ? anchor.previousSibling : parent.lastChild;

  //   if (start && (start === end || start.nextSibling)) {
  //     while (true) {
  //       parent.insertBefore(start.cloneNode(true), anchor);
  //       if (start === end || !(start = start.nextSibling)) break;
  //     }
  //   } else {
  //     templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
  //     const template = templateContainer.content;
  //     if (isSVG) {
  //       const wrapper = template.firstChild;
  //       while (wrapper.firstChild) {
  //         template.appendChild(wrapper.firstChild);
  //       }
  //       template.removeChild(wrapper);
  //     }
  //     parent.insertBefore(template, anchor);
  //   }
  //   return [
  //     before ? before.nextSibling : parent.firstChild,
  //     anchor ? anchor.previousSibling : parent.lastChild
  //   ];
  // }
};
