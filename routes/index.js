const express = require('express')

const router = express.Router()

// 載入 record 相關路由
const records = require('./records')

router.use('/index', records)

router.get('/', (req, res) => {
    res.send('Hello, World')
})

module.exports = router