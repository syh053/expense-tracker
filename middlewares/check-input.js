const checkInput = (req, res, next) => {

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

    next()

}

module.exports = checkInput
