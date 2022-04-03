const express = require('express')
const session = require('express-session')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverRide = require('method-override')
const flash = require('connect-flash')

require('dotenv').config()

const routes = require('./routes')
const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = 3000

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(session({ secret: 'MyRestaurantListSecret', resave: false, saveUninitialized: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverRide('_method'))

usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`網站已開啟：http:/localhost:${port}`)
})
