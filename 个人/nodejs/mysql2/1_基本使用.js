const mysql = require('mysql2')

const connection = mysql.createConnection({
    // host: '192.168.50.146',
    host: 'localhost',
    port: 3306,
    database: 'hundredyear',
    user: 'root',
    password: 'm1317662314'
})

const state = `select * from products`
const statement = `SELECT brand,JSON_ARRAYAGG(products.url) as pic FROM products GROUP BY brand   HAVING  brand='华为'`
const statement2 = `SELECT brand,JSON_ARRAYAGG(products.url) as pic FROM products GROUP BY brand   HAVING  brand=?;`
// connection.query(statement, (err, res, fields) => {
//     console.log(res);
// })

//预处理语句  性能更快 更安全
connection.execute(statement2, ['小米'], (err, res) => {
    console.log(res[0].pic[0]);
    console.log(res[0].pic[1]);
})