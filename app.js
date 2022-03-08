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

app.get('/restaurant/add', (req, res) => {
  return res.render('add')
})

app.post('/restaurant', (req, res) => {
  const addItems = req.body
  console.log(addItems)
  return restaurant_list.create(addItems)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const search = restaurant_list.results.filter((item) => {
    return item.name.toLowerCase().includes(keyword) || item.category.toLowerCase().includes(keyword)
  })

  res.render('index', { restaurants: search, keyword: keyword })
})

app.get('/restaurants/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  const item = restaurant_list.results.find((item) => {
    return id === item.id.toString()
  })

  res.render('show', { restaurant: item })
})

app.listen(port, () => {
  console.log(`http:/localhost:${port}`)
})
