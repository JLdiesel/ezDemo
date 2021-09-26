
const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.query);
    if (req.query !== {}) {
        res.json('create user success')
    } else {
        res.json(['why', 'kobe', 'lilei'])
    }

})

router.get('/:id', (req, res, next) => {
    res.json(`${req.params.id}用户的信息`)
})

/* router.get('/', (req, res, next) => {
    res.json('create user success')
})
 */












module.exports = router