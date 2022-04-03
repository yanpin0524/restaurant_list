const bcrypt = require('bcryptjs')
const db = require('../../config/mongoose')
const Restaurants = require('../restaurant')
const User = require('../user')
const restaurantList = require('./restaurant.json')
const seedUser = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    have: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    have: [3, 4, 5]
  }
]

db.once('open', () => {
  return Promise.all(Array.from(seedUser, (seedUser) => {
    User.findOne({ email: seedUser.email })
      .then((user) => {
        if (user) return user

        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(seedUser.password, salt))
          .then(hash => User.create({
            name: seedUser.name,
            email: seedUser.email,
            password: hash
          }))
      })
      .then(user => {
        const userId = user._id
        return Promise.all(Array.from(restaurantList.results, (item, index) => {
          if (seedUser.have.includes(index)) {
            const addItem = item
            addItem.userId = userId
            Restaurants.create(addItem)
          }
        }))
      })
  }))
})
  .then(() => {
    console.log('種子資料 載入結束')
    // process.exit() 啟動之後就無法載入種子資料了，搞不太懂Promise的原理。
  })
  .catch(err => console.log(err))
