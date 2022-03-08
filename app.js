const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000
const restaurant_list = require('./models/restaurant')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('連線錯誤!!')
})

db.once('open', () => {
  console.log('連線成功')
})

app.get('/', (req, res) => {
  restaurant_list.find()
    .lean()
    .then(item => res.render('index', { restaurants: item }))
    .catch(error => console.log(error))
})

// 新增餐廳
app.get('/restaurant/add', (req, res) => {
  return res.render('add')
})

app.post('/restaurant', (req, res) => {
  const addItems = req.body
  return restaurant_list.create(addItems)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 查詢餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const search = restaurant_list.results.filter((item) => {
    return item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
  })

  res.render('index', { restaurants: search, keyword: keyword })
})

// 瀏覽詳細資訊
app.get('/restaurant/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return restaurant_list.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 編輯餐廳內容
app.get('/restaurant/:restaurants_id/edit', (req, res) => {
  const id = req.params.restaurants_id
  return restaurant_list.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurant/:restaurants_id/edit', (req, res) => {
  const editItem = req.body
  const id = req.params.restaurants_id
  return restaurant_list.findByIdAndUpdate(id, editItem)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch(error => console.log(error))
})

// 刪除餐廳
app.post('/restaurant/:restaurants_id/delete',(req, res) => {
  const id = req.params.restaurants_id
  return restaurant_list.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`http:/localhost:${port}`)
})
