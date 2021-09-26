const express = require('express')
const fs = require('fs')
const morgan = require('morgan')
const app = express()
const WriteStream = fs.createWriteStream('./logs/access.log', {
    flags: 'a+'
})

//第一个字段：格式
//
app.use(morgan("combined", { stream: WriteStream }))

app.get('/home', (req, res, next) => {
    res.end('helloworld')
})
app.listen(3000, () => {
    console.log('启动成功');
})