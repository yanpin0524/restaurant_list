const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000
const restaurant_list = require('/restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: main }))
app.set('view engine', 'handlebars')

