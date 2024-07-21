const express = require('express')

const router = express.Router()

const db = require('../db/models')
const Record = db.record
const Category = db.category

router.get('/', (req, res, next) => {
  // console.log('session :', req.session)
  console.log('user :', req.user)
  const id = req.user.id

  // 類別參數
  const keyword = req.query.keyword

  // 判斷類別及 userID
  let sort = req.query.keyword
    ? { categoryID: keyword, userID: id }
    : { userID: id }

  // 類別選擇全部時
  if (keyword === '0') {
    sort = { userID: id }
  }

  Record.findAll({
    attributes: ['id', 'name', 'date', 'amount', 'categoryID'],
    where: sort,
    raw: true,
    nest: true, // 能把資料整理成比較容易取用的結構
    include: [{ model: Category, attributes: ['pattern'] }] // 利用 include 啟用 join 功能
  })
    .then(records => {
      Record.sum('amount', { where: sort })
        .then(total => {
          if (!total) {
            const total = 0
            return res.render('trackers', { records, total, keyword })
          }

          return res.render('trackers', { records, total, keyword })
        })
        .catch(err => {
          err.message = '無法顯示總畫面'
          next(err)
        })
    })
})

router.get('/new', (req, res) => {
  res.render('new')
})

router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id
  Record.findOne({
    attributes: ['id', 'name', 'date', 'amount', 'categoryID'],
    where: { id },
    raw: true
  })
    .then(record => {
      if (!record) {
        const err = new Error()
        err.message = '查無紀錄!'
        return next(err)
      }

      return res.render('edit', { record })
    })
    .catch(err => {
      err.message = '無法顯示總畫面'
      next(err)
    })
})

router.post('/', (req, res, next) => {
  const body = req.body
  const id = req.session.passport.user.id

  Record.create({
    name: body.name,
    date: body.date,
    amount: body.amount,
    userID: id,
    categoryID: body.category
  })
    .then(() => {
      req.flash('success', '創建成功!')
      return res.redirect('/index')
    })
    .catch(err => {
      if (!body.name) {
        err.message = '未輸入名稱'
        return next(err)
      }

      if (!body.date) {
        err.message = '未輸入日期'
        return next(err)
      }

      if (!body.category) {
        err.message = '未輸入類別'
        return next(err)
      }

      if (!body.amount) {
        err.message = '未輸入金額'
        return next(err)
      }

      err.message = '新增失敗'
      next(err)
    })
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const body = req.body

  // 未輸入名稱時的處理
  if (!body.name) {
    const err = new Error()
    err.message = '未輸入名稱'
    return next(err)
  }

  Record.update({
    name: body.name,
    date: body.date,
    amount: body.amount,
    userID: 1, // 暫時用 1
    categoryID: body.categoryID
  },
  { where: { id } }
  )
    .then(() => {
      req.flash('success', '編輯成功!')
      return res.redirect('/index')
    })
    .catch(err => {
      if (!body.date) {
        err.message = '日期不得為空'
        next(err)
      }

      if (!body.category) {
        err.message = '類別不得為空'
        next(err)
      }

      if (!body.amount) {
        err.message = '金額不得為空'
        next(err)
      }

      err.message = '編輯失敗'
      next(err)
    })
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id

  Record.destroy({ where: { id } })
    .then(() => {
      req.flash('success', '刪除成功!')
      return res.redirect('/index')
    })
    .catch(err => {
      err.message = '刪除失敗'
      next(err)
    })
})

module.exports = router
