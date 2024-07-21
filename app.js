// 載入 express
const express = require('express')
const app = express()
const port = 3000

// 在 NODE_ENV 為 development 的條件下，使用 dotenv 套件設定環境變數
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

// 載入總路由
const router = require('./routes/index')

// 啟用靜態檔案
app.use(express.static('public'))

// 啟用 Handlebars 樣板引擎
const { engine } = require('express-handlebars')

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', './views')

// 允許讀取 req.body 資訊
app.use(express.urlencoded({ extended: true }))

// 載入 handlebars 並設定自定義判斷條件
const handlebars = require('./handlebars')

// 載入 method-override 套件
const methodOverride = require('method-override')

app.use(methodOverride('_method'))

// 載入 express-session
const session = require('express-session')

// 載入訊息 middleware
const messageHandler = require('./middlewares/message-handler')

// 載入錯誤訊息 middleware
const errorHandler = require('./middlewares/error-handler')

// session設定
app.use(session({
  secret: process.env.SESSION_SECRET, // signature
  // name: 'hua',  // 存放在cookie的key，如果不寫的話預設是connect.sid
  saveUninitialized: false,
  resave: false
}))

// 載入 passport 套件
const passport = require('./config/passport')

app.use(passport.initialize())
app.use(passport.session()) // 需要設定反序列化(deserializeUser)到會話(session)，否則會跳錯誤

// 載入 connect-flash
const flash = require('connect-flash')

app.use(flash())

// 啟用訊息 middleware
app.use(messageHandler)

// 啟用路由 middleware
app.use(router)

// 啟用錯誤訊息 middleware
app.use(errorHandler)

app.listen(port, (req, res) => {
  console.log(`Express server is running on http://localhost:${port}/login`)
})
