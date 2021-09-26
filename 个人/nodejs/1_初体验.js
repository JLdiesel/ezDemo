const http = require('http')
const qs = require('querystring')
const server = http.createServer((req, res) => {
    // console.log(req.url);
    /*    console.log(req.headers);
       console.log(req.method); */
    /*     const url = new URL(`${req.url}`, 'http://localhost:3000')
        console.log(url.search);
        console.log(url.href);
        console.log(url.pathname); */
    console.log(req.url);
    console.log(req.method);
    if (req.url === '/login') {
        if (req.method === 'POST') {
            req.setEncoding('utf-8')
            req.on('data', (data) => {
                const { username, age } = JSON.parse(data);
                console.log(username, age);

            });
        }
    }


    /*     console.log(qs.parse(search.split('?')[1]));
        console.log(searchParams.get('name'));
        console.log(searchParams.get('age')); */

    res.end('hello')
})
server.listen(3000, '0.0.0.0', () => {
    console.log('服务器创建成功');
})