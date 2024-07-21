const express = require('express')

const router = express.Router()

// 載入 user 相關路由
const users = require('./users')

// 載入 record 相關路由
const records = require('./records')

// 載入 register 相關路由
const registers = require('./registers')

// 載入 OAuth 相關路由
const OAuth = require('./OAuth')

// 載入身分驗證 middleware
const Auth = require('../middlewares/authenticate')

router.use('/index', Auth, records)
router.use('/login', users)
router.use('/register', registers)
router.use('/login', OAuth)

router.get('/', (req, res) => {
  res.send('Hello, World')
})

router.post('/logout', (req, res) => {
  res.redirect('/login')
})

module.exports = router
