/* 
HTML Attributes 指的就是定义在 HTML 标签上的属性
当浏览器解析HTML代码后，会创建一个与之相符的 DOM 元素对象
DOM 对象会包含很多属性，这些属性就是所谓的 DOM Properties。
很多 HTML Attributes 在DOM 对象上有与之同名的 DOM Properties，
例如 id="my-input" 对应 el.id，type="text"对应el.type，value="foo" 对应el.value 等。

但 DOM Properties 与 HTML Attributes 的名字不总是一模一样的
类似地，也不是所有 DOM Properties 都有与之对应的 HTMLAttributes
例如可以用 el.textContent 来设置元素的文本内容，但并没有与之对应的 HTML Attributes 来完成同样的工作。

一个 HTML Attributes 可能关联多个 DOM Properties。

HTML Attributes的作用是设置与之对应的 DOM Properties 的初始值
如果你通过 HTML Attributes 提供的默认值不合法，
那么浏览器会使用内建的合法值作为对应 DOM Properties 的默认值
*/