const express =require('express') 
const app = express();
app.use((req, res,next) => {
    console.log('服务器被请求了');
    next();
})
app.get('/home', (req, res) => {
    const stu = [
        {id:01,name:'张三',age:18},
        {id:02,name:'李四',age:18},
        {id:03,name:'王五',age:18},
        {id:04,name:'金龙',age:18}
    ]
    res.send(stu)
})
app.listen(8081)