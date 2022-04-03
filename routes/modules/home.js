const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'desc' })
    .then((item) => res.render('index', { restaurants: item }))
    .catch((error) => console.log(error))
})

// 查詢餐廳
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id

  if (!keyword) return res.redirect('/')

  return Restaurant.find({ userId })
    .lean()
    .then((allData) => {
      const search = allData.filter((item) => {
        return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase())
      })

      res.render('index', { restaurants: search, keyword })
    })
    .catch((error) => console.log(error))
})

module.exports = router
