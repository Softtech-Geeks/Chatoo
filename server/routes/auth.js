const express = require('express')

// import functions from controllers folder / auth file
const { signup, login, signupG, loginG } = require('../controllers/auth.js')

const authRoutes = express.Router()

// use function for /signup and /login pathes
authRoutes.post('/signup', signup)
authRoutes.post('/login', login)
authRoutes.get('/signup', signupG)
authRoutes.get('/login', loginG)
    // export post function
module.exports = authRoutes