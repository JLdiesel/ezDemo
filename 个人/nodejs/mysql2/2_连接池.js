const mysql = require('mysql2')
//创建连接池
const connections = mysql.createPool({
    host: 'localhost',
    database: 'hundredyear',
    user: 'root',
    password: 'm1317662314',
    connectionLimit: 10
});
const state = `select * from products`
const statement = `SELECT brand,JSON_ARRAYAGG(products.url) as pic FROM products GROUP BY brand   HAVING  brand='华为'`
const statement2 = `SELECT brand,JSON_ARRAYAGG(products.url) as pic FROM products GROUP BY brand   HAVING  brand=?;`

//使用连接池
connections.promise().execute(statement2, ['苹果']).then(([res, fields]) => {
    console.log(res);
}).catch(err => {
    console.log(err);
})

