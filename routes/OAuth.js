// 載入 express
const express = require('express')

// 設置路由
const router = express.Router()

// 載入 passport 套件
const passport = require('passport')

// 載入 checkInput middleware
const checkInput = require('../middlewares/check-input')

router.post('/', checkInput, passport.authenticate('local', {

  successRedirect: '/index',
  failureRedirect: '/login',
  failureFlash: true // 啟用 flash 功能

}))

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] }))

router.get('/oauth/facebook/redirect',
  passport.authenticate('facebook', {

    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true // 啟用 flash 功能

  }
  ))

module.exports = router
