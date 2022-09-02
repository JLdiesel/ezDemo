    //contextify：返回a路径到b路径的相对路径 用于加载模块  
function stringifyRequest(loaderContext,resource) {
  return JSON.stringify( loaderContext.utils.contextify(
      loaderContext.context,
      resource
    ))
}
exports.stringifyRequest=stringifyRequest