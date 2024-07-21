// 載入資料庫
const db = require('../db/models')
const User = db.user

//載入 passport 套件
const passport = require('passport')
const localStrategy = require('passport-local')
const facebookStrategy = require('passport-facebook')

// 載入 bcryptjs 套件
const bcrypt = require('bcryptjs')

// 設置 passport-local
passport.use(new localStrategy({ usernameField: 'mail' },
    (username, password, done) => {

        User.findOne({
            attributes: ['id', 'name', 'mail', 'password'],
            where: { mail: username }
        })
            .then(user => {

                // 確認帳號是否存在
                if (!user) {
                    return done(null, false, { type: 'error', message: '帳號不存在' })
                }

                // 確認密碼是否正確
                const compare = bcrypt.compareSync(password, user.password)

                if (!compare) {
                    return done(null, false, { type: 'error', message: 'email 或 password 輸入錯誤!!' })
                }

                return done(null, user)
            })

            .catch(err => done(err))

    }))

// 設置 passport-facebook 
passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACKURL,
    profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {

    const email = profile.emails[0].value
    const name = profile.displayName

    User.findOne({
        attributes: ['id', 'name', 'mail'],
        where: { mail: email }
    })
        .then(user => {

            // 若有資料，直接呼叫 callback
            if (user) return done(null, user)

            // 若沒有資料，則建立使用者資料，首先建立密碼
            const randomPwd = Math.random().toString(36).slice(-8)

            const hash = bcrypt.hash(randomPwd, 10)
                .then(hash => {
                    return User.create({
                        name,
                        mail: email,
                        password: hash
                    })
                })

                .then(user => done(null, user))

                .catch(err => done(err))

        })

        .catch(err => done(err))
}))

passport.serializeUser((user, done) => {
    const { id, name, mail } = user
    done(null, { id, name, mail })
})

passport.deserializeUser((user, done) => {
    const { id, name, mail } = user
    done(null, { id })
})

module.exports = passport
