const login = (req, res) => {
    try {

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error })
    }
}

const signup = (req, res) => {
    try {
        const { fullName, userName, phone, password, confirm, avatarURL, img } = req.body;
    } catch (error) {
        console.log(error)

        res.status(500).json({ message: error })
    }
}

module.exports = { signup, login }