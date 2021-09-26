const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
router.get('/:id', (ctx, next) => {
    // http://localhost:3000/users/123?name=jl&age=18
    //params id:123
    console.log(ctx.params);
    //{name:'jl',age:18}
    console.log(ctx.query);
    console.log(ctx.response);
    ctx.response.body = 'User Lists'
})
router.post('/', (ctx, next) => {
    console.log(ctx.request.body);
    ctx.response.body = 'User Lists'
})
router.put('/', (ctx, next) => {
    ctx.response.body = 'put request'
})
module.exports = router