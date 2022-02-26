const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurant_list = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.send('<h1> This is a web app for express. </h1>')
})

app.listen(port, () => {
  console.log(`http:/localhost:${port}`)
})
