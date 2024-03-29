const { stringifyRequest } = require("./utils")
const stylePostLoaderPath=require.resolve('./stylePostLoader')

const pitcher = code => code
const isNotPitcher = loader => loader.path !== __filename
const isCSSLoader=loader=>/css-loader/.test(loader.path)
const pitch = function () {
  const loaderContext = this
  // loaders=[pitcher,vue-loader] 过滤掉自己 loaders=[vue-loader]
  const loaders = loaderContext.loaders.filter(isNotPitcher)
  //query=vue&type=script
  const query = new URLSearchParams(loaderContext.resourceQuery.slice(1))
  if (query.get('type') === 'style') {
    const cssLoaderIndex = loaders.findIndex(isCSSLoader)
    //把stylePostLoaderPath插入css-loader的右边
    return genProxyModule([
      ...loaders.slice(0,cssLoaderIndex+1),stylePostLoaderPath,...loaders.slice(cssLoaderIndex+1)
    ],loaderContext)
  }
  return genProxyModule(loaders,loaderContext,query.get('type')!=='template')
}
function genProxyModule(loaders,loaderContext,exportDefault) {
  const request = genRequest(loaders, loaderContext);
  //script style 默认导出  template 批量导出  
  return exportDefault? `export {default} from ${request} `:`export * from ${request} `
}
function genRequest(loaders, loaderContext) {
  //loader.request 是loader文件的绝对路径
  const loaderStrings = loaders.map(loader => loader.request||loader)
  //要加载的资源的绝对路径
  const resource = loaderContext.resourcePath + loaderContext.resourceQuery
  //在前面加上关键字 会忽略配置文件中的loader  !!会忽略其他所有的loader -!会忽略行内loader
  return stringifyRequest(loaderContext,'!!'+[...loaderStrings,resource].join('!'))
}
pitcher.pitch = pitch
module.exports=pitcher