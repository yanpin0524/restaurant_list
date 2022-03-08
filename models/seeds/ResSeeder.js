const mongoose = require('mongoose')
const Restaurants = require('../restaurant')
const restaurantList = require('../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('連線錯誤!!')
})

db.once('open', () => {
  console.log('連線成功')

  restaurantList.results.forEach((item) => {
    Restaurants.create({
      name: item.name,
      name_en: item.name_en,
      category: item.category,
      image: item.image,
      location: item.location,
      phone: item.phone,
      google_map: item.google_map,
      rating: item.rating,
      description: item.description
    })
  })

  console.log('種子資料 載入結束')
})
