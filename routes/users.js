//載入 express 
const express = require('express')

// 設置路由
const router = express.Router()

// 載入資料庫
const db = require('../db/models')
const User = db.user

//載入 passport 套件
const passport = require('passport')
const localStrategy = require('passport-local')

// 載入 bcryptjs 套件
const bcrypt = require('bcryptjs')

// 載入 checkInput middleware
const checkInput = require('../middlewares/check-input')

// 設置 passport-local
passport.use(new localStrategy({ usernameField: 'mail' },
    (username, password, done) => {

        User.findOne({
            attributes: ['id', 'name', 'mail', 'password'],
            where: { mail: username }
        })
            .then( user => {

                // 確認帳號是否存在
                if (!user) {
                    return done(null, false, { type: 'error', message: '帳號不存在'})
                }

                // 確認密碼是否正確
                const compare = bcrypt.compareSync(password, user.password)

                if (!compare) {
                    return done(null, false, { type: 'error', message: 'email 或 password 輸入錯誤!!'})
                }

                return done(null, user)
            })

            .catch( err => done(err) )

    }))

passport.serializeUser( (user, done) => {
    const { id, name, mail } = user
    done(null, { id, name, mail })
})

passport.deserializeUser( (user, done) => {
    const { id, name, mail } = user
    done(null, { id })
})

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', checkInput, passport.authenticate('local', {

    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true  // 啟用 flash 功能

}))


module.exports = router