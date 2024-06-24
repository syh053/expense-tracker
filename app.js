const express = require('express')
const app = express()
const port = 3000



app.get('/', (req, res) => {
    res.send('Hello, World')
})

app.get('/index', (req, res) => {
    res.send('這裡是主畫面')
})

app.get('/new', (req, res) => {
    res.send('這裡是新增費用畫面')
})

app.get('/:id/edit', (req, res) => {
    const id = req.params.id
    res.send(`這裡是 ${id} 編輯畫面`)
})

app.post('/edit', (req, res) => {
    res.send('增加費用')
})

app.put('/:id', (req, res) => {
    res.send('編輯費用')
})

app.delete('/edit', (req, res) => {
    res.send('這裡是編輯畫面')
})


app.listen(port, (req, res) => {
    console.log(`Express server is running on http://localhost:${port}`)
})