//載入 express 
const express = require('express')
const app = express()
const port = 3000

//載入總路由
const router = require('./routes/index')

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

app.use(methodOverride('_method'))

//載入 express-session
const session = require('express-session')

app.use(session({
    secret: 'ThisIsSecret',
    // name: 'hua',  // 存放在cookie的key，如果不寫的話預設是connect.sid
    saveUninitialized: false,
    resave: false
}))

//載入 connect-flash
const flash = require('connect-flash')

app.use(flash())

// 啟用路由 middleware
app.use(router)

app.listen(port, (req, res) => {
    console.log(`Express server is running on http://localhost:${port}`)
})