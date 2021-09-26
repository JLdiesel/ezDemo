const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.query);
    if (req.query.list !== {}) {
        res.json(`${req.query.list}条数据的内容`)
    } else {
        res.json("All products")
    }

})

router.get('/:id', (req, res, next) => {
    // res.json(`${req.params.id}用户的信息`)
    res.json(`ID为${req.params.id}的商品的信息`)
})


/* router.get('/', (req, res, next) => {
    res.json('create user success')
})
 */












module.exports = router