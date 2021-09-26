const express = require('express')

const app = express();
const USER_NAME_NOT_EXISTS = 'username not exists'
const USER_NAME_NOT_LOGIN = 'user not login'

app.post('/login', (req, res, next) => {

    const islogin = true
    if (islogin) {
        res.json('欢迎您')
    } else {
        /*         res.type(400)
                res.json("用户未登录") */
        next(new Error(USER_NAME_NOT_LOGIN))

    }
})


app.post('/register', (req, res, next) => {
    const isExists = false
    if (isExists) {
        res.json('用户注册成功')
    } else {
        next(new Error(USER_NAME_NOT_EXISTS))
        /*         res.type(400)
                res.json("注册失败") */
    }
})
app.use((err, req, res, next) => {
    let status = 400;
    let message = '';
    switch (err.message) {
        case USER_NAME_NOT_EXISTS:
            message = '用户未注册'
            break;
        case USER_NAME_NOT_LOGIN:
            message = '用户未登录'
            break;
        default:
            message = '未找到用户'
    }
    res.status(status)
    res.json({
        errcode: status, message
    })


})


app.listen(3000, () => {
    console.log('服务器启动成功');
})