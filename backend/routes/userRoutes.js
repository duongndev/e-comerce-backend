const express = require('express')
const {
  getProfile
} = require('../controller/user.controller')
const {verifyUser} = require('../middleware/authMiddleware')
const router = express.Router()


router.route('/me').get([verifyUser], getProfile)

module.exports = router
