const compiler = require('vue/compiler-sfc');
module.exports = function (source) {
  const loaderContext=this
  const query=new URLSearchParams(loaderContext.resourceQuery.slice(1))
  const { code} = compiler.compileStyle({
    source,
    id: `data-v-${query.get('id')}`,
    scoped:!!query.get('scoped')
  })
  loaderContext.callback(null,code)
}