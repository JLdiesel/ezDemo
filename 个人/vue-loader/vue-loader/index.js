const compiler = require('vue/compiler-sfc');
const { stringifyRequest } = require('./utils');
const plugin = require('./plugin');
const hash = require('hash-sum')
const select = require('./select');
function loader(source) {
  //loader函数执行时的this指针 上面挂载了很多方法和属性
  const loaderContext = this
  // resourcePath:文件的绝对路径  resourceQuery:资源的query参数
  const { resourcePath, resourceQuery } = loaderContext
  // 为了第三轮的执行
  const rawQuery = resourceQuery.slice(1);
  const incomingQuery = new URLSearchParams(rawQuery);

  const { descriptor } = compiler.parse(source);  
  const id = hash(resourcePath)//后面在实现scoped css的时候会用到
  const hasScoped=descriptor.styles.some(s=>s.scoped)
  if (incomingQuery.get('type')) {
    return select.selectBlock(descriptor,id,loaderContext,incomingQuery)
  }
  const code = [];
  const { script,template,styles } = descriptor;
  if (script) {
    const query=`?vue&type=script&id=${id}&lang=js`
    const request =stringifyRequest(loaderContext,resourcePath+query)
    code.push(`import script from ${request}`)
  }
  if (template) {
    const scopedQuery = hasScoped ? `&scoped=true` : '';
    const query = `?vue&type=template&id=${id}${scopedQuery}&lang=js`
    const request = stringifyRequest(loaderContext, resourcePath + query)
    code.push(`import {render} from ${request}`)
  }
  if (styles.length > 0) {
    styles.forEach((style, index) => {
    const scopedQuery = style.scoped ? `&scoped=true` : '';
      const query = `?vue&type=style&index=${index}&id=${id}${scopedQuery}&lang=css`
      const request =stringifyRequest(loaderContext,resourcePath+query)
      code.push(`import ${request}`)
    })
  }
  if (hasScoped) {
    //为了给template的属性添加hash
    code.push(`script.__scopeId="data-v-${id}"`)
  }
  code.push(`script.render=render`)
  code.push(`export default script`)
  return code.join('\n')
}
loader.VueLoaderPlugin=plugin
module.exports = loader
