// 載入 express
const express = require('express')

// 設置路由
const router = express.Router()

router.get('/', (req, res) => {
  res.render('login')
})

module.exports = router
