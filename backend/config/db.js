require('dotenv').config()
const mongoose = require('mongoose')


const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )

    console.log('MongoDB connection SUCCESS')
  } catch (error) {
    console.error('MongoDB connection FAIL')
    process.exit(1)
  }
}

module.exports = {connectDB}
