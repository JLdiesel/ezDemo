const express = require('express')
const app = express()

//http://localhost:3000/home/18/jl
app.get('/home/:id/:name', (req, res, next) => {
    req.params.id ? console.log(req.params.id) : undefined
    req.params.name ? console.log(req.params.name) : undefined

    res.end('helloworld')
})
//http://localhost:3000/login?name=jl&age=18
app.get('/login', (req, res, next) => {
    console.log(req.query);
    //返回json格式
    // res.type('application/json')
    // res.end(JSON.stringify({ name: 'jl', age: '18' }))

    //设置响应码
    res.status(400);
    //简写
    res.json({ name: '金龙', age: 18 })
})
app.listen(3000, () => {
    console.log('启动成功');
})