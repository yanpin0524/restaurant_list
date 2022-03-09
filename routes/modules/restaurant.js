const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// 新增餐廳
router.get('/add', (req, res) => {
  return res.render('add')
})

router.post('/', (req, res) => {
  const addItems = req.body
  return Restaurant.create(addItems)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

// 瀏覽詳細資訊
router.get('/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})

// 編輯餐廳內容
router.get('/:restaurants_id/edit', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:restaurants_id', (req, res) => {
  const editItem = req.body
  const id = req.params.restaurants_id
  return Restaurant.findByIdAndUpdate(id, editItem)
    .then(() => res.redirect(`/restaurant/${id}`))
    .catch((error) => console.log(error))
})

// 刪除餐廳
router.delete('/:restaurants_id', (req, res) => {
  const id = req.params.restaurants_id
  return Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))
})

module.exports = router
