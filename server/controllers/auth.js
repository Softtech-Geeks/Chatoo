const { consect } = require('getstream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const crypto = require('crypto')

const login = (req, res) => {
    try {

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error })
    }
}

const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const api_id = process.env.STREAM_API_ID

const signup = (req, res) => {
    try {
        const { fullName, userName, phone, password, confirm, avatarURL, img } = req.body;
        const userId = crypto.randomBytes(16).toString('hex')
        const serverClient = connect(api_key, api_secret, api_id)

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error })
    }
}

module.exports = { signup, login }