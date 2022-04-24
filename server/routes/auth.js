const express = require('express')

// import functions from controllers folder / auth file
const { signup, login } = require('../controllers/auth.js')

const router = express.Router()

// use function for /signup and /login pathes
router.post('/signup', signup)
router.post('/login', login)

// export post function
module.exports = router