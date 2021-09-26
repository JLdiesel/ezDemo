const http = require('http')
const qs = require('querystring')
const server = http.createServer((req, res) => {
    res.statusCode = 404;
    res.writeHead(200, {
        // "Content-Type": "application/html;charset=utf8"
        "Content-Type": "text/html;charset=utf8"
        // "Content-Type": "application/json;charset=utf8"
    })

    res.write('响应了')
    res.end('<h2>hello</h2>')
})
server.listen(3000, '0.0.0.0', () => {
    console.log('服务器创建成功');
})