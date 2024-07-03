//載入 express 
const express = require('express')
const app = express()
const port = 3000

//載入資料模型
const db = require('./db/models')
const Record = db.record
const Category = db.category

// 啟用靜態檔案
app.use(express.static('public'))

// 啟用 Handlebars 樣板引擎
const { engine } = require('express-handlebars')
const { raw } = require('mysql2')

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs')
app.set('views', './views')

// 允許讀取 req.body 資訊
app.use(express.urlencoded({ extended: true }))

//載入 handlebars 並設定自定義判斷條件
const handlebars = require('./handlebars')

// 載入 method-override 套件
const methodOverride = require('method-override')
const { where } = require('sequelize')

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.send('Hello, World')
})

app.get('/index', (req, res) => {

    // 判別是否選取類別
    const keyward = req.query.keyward
    const sort = req.query.keyward ? { categoryID: keyward } : {}

    Record.findAll({
        attributes: ['id', 'name', 'date', 'amount', 'categoryID'],
        where: sort,
        raw: true,
        nest: true, //能把資料整理成比較容易取用的結構
        include: [{ model: Category, attributes: ['pattern'] }] // 利用 include 啟用 join 功能 
    })
        .then( records => {

            Record.sum('amount', { where: sort })
                .then(total => {
                    return res.render('trackers', { records, total, keyward })
                })
        })
})

app.get('/index/new', (req, res) => {
    res.render('new')
})

app.get('/index/:id/edit', (req, res) => {
    const id = req.params.id
    Record.findOne({
        attributes: ['id', 'name', 'date', 'amount', 'categoryID'],
        where: { id },
        raw: true
    })
        .then( record => {
            return res.render('edit', { record })
        })
})

app.post('/index', (req, res) => {

    const body = req.body

    Record.create({
        name: body.name,
        date: body.date,
        amount: body.amount,
        userID: 1, //暫時用 1
        categoryID: body.category
    })
        .then( () => {
            return res.redirect('/index')
        })
    // res.send('增加費用')
})

app.put('/index/:id', (req, res) => {

    const id = req.params.id
    const body = req.body

    Record.update({
        name: body.name,
        date: body.date,
        amount: body.amount,
        userID: 1, //暫時用 1
        categoryID: body.categoryID
    },
    { where: { id } }
)
        .then(  () => {
            return res.redirect('/index')
        })

})

app.delete('/index/:id', (req, res) => {

    const id = req.params.id

    Record.destroy({where: { id }})
        .then( () => {
            return res.redirect('/index')
        })
})


app.listen(port, (req, res) => {
    console.log(`Express server is running on http://localhost:${port}`)
})