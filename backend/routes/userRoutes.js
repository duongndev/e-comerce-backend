const express = require('express')
const {
  getProfile,
  getAllUsers,
} = require('../controller/user.controller')
const {verifyUser} = require('../middleware/authMiddleware')
const router = express.Router()



router.get('/', getAllUsers)

router.get('/me', [verifyUser], getProfile)

module.exports = router
