require('dotenv').config()

const {users} = require('./data/products')
const {connectDB} = require('./config/db')
const Product = require('./models/Product')
const Category = require('./models/Category')
const Users = require('./models/User')


connectDB()

const importData = async () => {
  try {
    // await Category.deleteMany({})
    // await Category.insertMany(categories)

    // await Product.deleteMany({})
    await Users.deleteMany({})
    await Users.insertMany(users)
    


    console.log('Data Import Success')

    process.exit()
  } catch (error) {
    console.error('Error with data import', error)
    process.exit(1)
  }
}

importData()
