const name='jl'

//此时执行module.exports={},exports=module.exports
//但是重新给export赋值了一个复杂对象  此时exports指向的不是module.exports
exports = {}
exports.name = '12312'
//最终暴露的还是module.exports  所以exports里的内容并没有被暴露
module.exports={}