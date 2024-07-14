const express = require('express')
const router = express.Router()

const db = require('../db/models')
const User = db.user

const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/', (req, res, next) => {

    const { name, mail, password, ConfirmPassword } = req.body

    //確認名稱長度
    if (name.length > 100) {
        req.flash('error', '名稱過長')
        return res.redirect('back')
    }

    //確認是否輸入信箱
    if (!mail) {
        req.flash('error', '未輸入信箱')
        return res.redirect('back')
    }

    //確認是否輸入密碼
    if (!password) {
        req.flash('error', '未輸入密碼')
        return res.redirect('back')
    }

    //確認密碼是否輸入一致
    if (password !== ConfirmPassword) {
        req.flash('error', '密碼輸入不一致')
        return res.redirect('back')
    }

    User.findOne({
        attributes: ['mail', 'password'],
        where: { mail: mail }
    })
        .then(user => {
            if (user) {
                req.flash('error', '此信箱已註冊')
                return res.redirect('back')
            }

            bcrypt.hash(password, 10)
                .then(hash => {
                    User.create({
                        name: name,
                        mail,
                        password: hash
                    })
                        .then( user => {
                            req.flash('success', '註冊成功')
                            return res.redirect('login')
                        })
                        
                        .catch( err => {
                            err.message = '註冊失敗'
                            next( err )
                        })
                })
        })
})


module.exports = router