const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  await Campground.deleteMany({})
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '6148bc713c026db35cec9899',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos non consectetur architecto quos recusandae blanditiis expedita totam magnam! Aliquam, a?',
      price,
      geometry: { type: 'Point', coordinates: [-118.2439, 34.0544] },
      images: [
        {
          url:
            'https://res.cloudinary.com/dzvewrij6/image/upload/v1632941350/YelpCamp/xg8jdy7xn2mbhg4tkgio.jpg',
          filename: 'YelpCamp/xg8jdy7xn2mbhg4tkgio'
        },
        {
          url:
            'https://res.cloudinary.com/dzvewrij6/image/upload/v1632941350/YelpCamp/ktl8lycdazbndjznimfn.jpg',
          filename: 'YelpCamp/ktl8lycdazbndjznimfn'
        }
      ]
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
