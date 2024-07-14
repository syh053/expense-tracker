const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    
    const { mail, password } = req.body

    //確認是否輸入信箱
    if (!mail) {
        req.flash('error', '未輸入信箱')
        res.redirect('back')
    }

    //確認是否輸入密碼
    if (!password) {
        req.flash('error', '未輸入密碼')
        res.redirect('back')
    }

    res.send('這裡是登錄後頁面')
})


module.exports = router