// import libraries and functions from StreamAPI and bcrypt to encrypt password
const { consect } = require('getstream')
const bcrypt = require('bcrypt')
const StreamChat = require('stream-chat')
const crypto = require('crypto')

// import enviroment variables from .env file
const api_key = process.env.STREAM_API_KEY
const api_secret = process.env.STREAM_API_SECRET
const api_id = process.env.STREAM_API_ID

// login function
const login = async(req, res) => {
    try {
        const { userName, password } = req.body;
        const serverClient = connect(api_key, api_secret, api_id)
        const client = StreamChat.getInstance(api_key, api_secret)
        const { users } = await client.queryUsers({ name: userName })

        if (!users.length) return res.status(400).json({ message: "User Not Found." })
        const success = await bcrypt.compare(password, users[0].hashedPassword);

        const token = serverClient.createUserToken(users[0].id);
        if (success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error })
    }
}

// signup function
const signup = (req, res) => {
    try {
        const { fullName, userName, phone, password, confirm, avatarURL, img } = req.body;
        const userId = crypto.randomBytes(16).toString('hex')
        const serverClient = connect(api_key, api_secret, api_id)
        const hashedPassword = await bcrypt.hash(password, 10)
        const token = serverClient.createUserToken(userId)
        res.status(200).json({ token, fullName, userName, userId, hashedPassword, phone })
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error })
    }
}

// export login and signup
module.exports = { signup, login }