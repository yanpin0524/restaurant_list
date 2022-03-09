const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')

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

app.listen(port, () => {
  console.log(`網站已開啟：http:/localhost:${port}`)
})
