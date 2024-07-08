const express = require('express')

const router = express.Router()

const db = require('../db/models')
const Record = db.record
const Category = db.category

router.get('/', (req, res) => {

    // 判別是否選取類別
    const keyword = req.query.keyword
    const sort = req.query.keyword ? { categoryID: keyword } : {}

    Record.findAll({
        attributes: ['id', 'name', 'date', 'amount', 'categoryID'],
        where: sort,
        raw: true,
        nest: true, //能把資料整理成比較容易取用的結構
        include: [{ model: Category, attributes: ['pattern'] }] // 利用 include 啟用 join 功能 
    })
        .then(records => {

            try {

                Record.sum('amount', { where: sort })
                    .then(total => {
                        return res.render('trackers', { records, total, keyword, message: req.flash('success') })
                    })
                    .catch(err => {
                        console.log(err)
                        req.flash('error', '無法顯示總畫面')
                        return res.redirect('back')
                    })

            } catch (err) {

                console.log(err)
                req.flash('error', '無法顯示總畫面')
                return res.redirect('back')

            }
        })
})

router.get('/new', (req, res) => {
    res.render('new', { error: req.flash('error') })
})

router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Record.findOne({
        attributes: ['id', 'name', 'date', 'amount', 'categoryID'],
        where: { id },
        raw: true
    })
        .then(record => {
            return res.render('edit', { record, error: req.flash('error') })
        })
        .catch(err => {
            console.log(err)
            return res.redirect('back')
        })
})

router.post('/', (req, res) => {

    try {

        const body = req.body

        Record.create({
            name: body.name,
            date: body.date,
            amount: body.amount,
            userID: 1, //暫時用 1
            categoryID: body.category
        })
            .then(() => {
                req.flash('success', "創建成功!")
                return res.redirect('/index')
            })
            .catch(err => {

                console.log(err)

                if (!body.name) {
                    req.flash('error', '未輸入名稱')
                    return res.redirect('back')
                }

                if (!body.date) {
                    req.flash('error', '未輸入日期')
                    return res.redirect('back')
                }

                if (!body.category) {
                    req.flash('error', '未輸入類別')
                    return res.redirect('back')
                }

                if (!body.amount) {
                    req.flash('error', '未輸入金額')
                    return res.redirect('back')
                }

                req.flash('error', '新增失敗')
                return res.redirect('back')
            })

    } catch (err) {
        console.log(err)
        req.flash('error', '新增失敗')
        return res.redirect('back')
    }

})

router.put('/:id', (req, res) => {

    const id = req.params.id
    const body = req.body

    // 未輸入名稱時的處理
    if (!body.name) {
        req.flash('error', '名稱不得為空')
        return res.redirect('back')
    }

    Record.update({
        name: body.name,
        date: body.date,
        amount: body.amount,
        userID: 1, //暫時用 1
        categoryID: body.categoryID
    },
        { where: { id } }
    )
        .then(() => {
            req.flash('success', "編輯成功!")
            return res.redirect('/index')
        })
        .catch(err => {

            console.log(err)

            if (!body.date) {
                req.flash('error', '日期不得為空')
                return res.redirect('back')
            }

            if (!body.category) {
                req.flash('error', '類別不得為空')
                return res.redirect('back')
            }

            if (!body.amount) {
                req.flash('error', '金額不得為空')
                return res.redirect('back')
            }

            req.flash('error', '新增失敗')
            return res.redirect('back')
        })
})

router.delete('/:id', (req, res) => {

    const id = req.params.id
    const keyword = req.query.keyword

    Record.destroy({ where: { id } })
        .then(() => {
            req.flash('success', "刪除成功!")
            return res.redirect('/index')
        })
})

module.exports = router
