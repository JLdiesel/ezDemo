//中间件的基本使用
const path = require('path')
//引入express框架
const express = require('express')
const multer = require('multer')
const app = express();
/* app.use((req, res, next) => {
    if (req.headers["content-type"] === 'application/json') {
        req.on('data', (data) => {
            console.log(data.toString());
            const info = JSON.parse(data.toString());
            req.body = info
        })
        req.on('end', () => {
            next()
        })
    } else {
        next()
    }
})
 */
//解析json插件
app.use(express.json())
//true用qs解析urlencoded
app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        //第二个字段传文件名
        cb(null, Date.now() + path.extname(file.originalname));
    },

})

const upload = multer({
    // dest: './uploads/'
    storage
});

// 解析插件 

//upload.array()
app.post('/upload', upload.single('file'), (req, res, next) => {
    console.log(req.file);
    res.send('文件上传成功')
})
app.post('/upload2', upload.array('file'), (req, res, next) => {
    console.log(req.files);
    res.send('文件上传成功')
})

app.get('/', (req, res, next) => {
    res.send('你好啊')
})
app.post('/request', (req, res, next) => {
    // res.end(req.body)
    console.log(req.body);
    res.send(req.body)
})
app.post('/login', upload.any(), (req, res, next) => {
    console.log(req.body);
    res.end("welcomeback")
})


//监听localhost:3000端口
app.listen(3001, () => {
    console.log('启动了');
});
