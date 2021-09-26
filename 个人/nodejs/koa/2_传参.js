const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const userRouer = require('./route/user')
const app = new Koa();
app.use(bodyParser());
app.use((ctx, next) => {
    console.log('请求经过中间件');
    if (ctx.request.url === '/login') {
        if (ctx.request.method === 'GET') {
            ctx.response.body = 'Login success'
        }
    } else {
        next()
    }
    // ctx.response.body = "hello world"
})
//注册路由
app.use(userRouer.routes())
//允许其他方法访问
app.use(userRouer.allowedMethods())
app.listen(3000, () => {
    console.log('成功');

})