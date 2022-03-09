const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')

const Restaurant = require('./models/restaurant')
const routes = require('./routes')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverRide('_method'))

app.use(routes)

// 新增餐廳
app.get('/restaurant/add', (req, res) => {
  return res.render('add')
})

app.post('/restaurant', (req, res) => {
  const addItems = req.body
  return Restaurant.create(addItems)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 瀏覽詳細資訊
app.get('/restaurant/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// 編輯餐廳內容
app.get('/restaurant/:restaurants_id/edit', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.put('/restaurant/:restaurants_id', (req, res) => {
  const editItem = req.body
  const id = req.params.restaurants_id
  return Restaurant.findByIdAndUpdate(id, editItem)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((error) => console.log(error))
})

// 刪除餐廳
app.delete('/restaurant/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`網站已開啟：http:/localhost:${port}`)
})
