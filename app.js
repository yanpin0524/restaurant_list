const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000
const restaurantList = require('./models/restaurant')
require('./config/mongoose')

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then((item) => res.render('index', { restaurants: item }))
    .catch((error) => console.log(error))
})

// 新增餐廳
app.get('/restaurant/add', (req, res) => {
  return res.render('add')
})

app.post('/restaurant', (req, res) => {
  const addItems = req.body
  return restaurantList.create(addItems)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 查詢餐廳
app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  if (!keyword) { res.redirect('/') }

  return restaurantList.find({})
    .lean()
    .then((allData) => {
      const search = allData.filter((item) => {
        return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase())
      })

      res.render('index', { restaurants: search, keyword })
    })
    .catch((error) => console.log(error))
})

// 瀏覽詳細資訊
app.get('/restaurant/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// 編輯餐廳內容
app.get('/restaurant/:restaurants_id/edit', (req, res) => {
  const id = req.params.restaurants_id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

app.post('/restaurant/:restaurants_id/edit', (req, res) => {
  const editItem = req.body
  const id = req.params.restaurants_id
  return restaurantList.findByIdAndUpdate(id, editItem)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((error) => console.log(error))
})

// 刪除餐廳
app.post('/restaurant/:restaurants_id/delete', (req, res) => {
  const id = req.params.restaurants_id
  return restaurantList.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 監聽伺服器
app.listen(port, () => {
  console.log(`網站已開啟：http:/localhost:${port}`)
})
