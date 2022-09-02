const ruleResource=(query,resource)=> `${resource}.${query.get('lang')}`
class VueLoaderPlugin{
  apply(compiler) {
    const rules = compiler.options.module.rules;
    const pitcher = {
      loader: require.resolve('./pitcher'),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get('vue')!==null
      }
    }
    const templateCompilerRule = {
      loader: require.resolve('./templateLoader'),
      resourceQuery: (query) => {
        if (!query) return false;
        let parsed = new URLSearchParams(query.slice(1));
        return parsed.get('template')!==null&&parsed.get('type')==='template'
      }
    }
    const vueRule=rules.find(rule=>'foo.vue'.match(rule.test))
    const cloneRules=rules.filter(rule=>rule!==vueRule).map(cloneRule)
    compiler.options.module.rules=[pitcher,templateCompilerRule,...cloneRules,...rules]
  }
}
function cloneRule(rule) {
  let currentResource
  const result = Object.assign(Object.assign({}, rule), {
    resource: r => {
      currentResource=r
      return true
    },
    resourceQuery: query => {
      if (!query) return false
      const parsed = new URLSearchParams(query.slice(1))
      if (parsed.get('vue') === null) return false
      const fakeResourcePath=ruleResource(parsed,currentResource)
      if (!fakeResourcePath.match(rule.test)) return false
      return true
      
    }
  })
  delete result.test
  return result
}
module.exports=VueLoaderPlugin