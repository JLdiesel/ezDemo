const express = require('express')
const userRouter = require('./route/user')
const productRouter = require('./route/products')
const app = express();
app.use('/users', userRouter);
app.use('/products', productRouter)

app.listen(3000, () => {
    console.log('服务器启动成功');
})