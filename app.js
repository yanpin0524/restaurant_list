const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurant_list = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurant_list.results })
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
