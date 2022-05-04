// import libraries
const express = require('express');
const cors = require('cors');

// import functions from auth file in routes folder
const authRoutes = require('./routes/auth.js');

const app = express();

// set port variable from env file or 5000
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// server responses on client requests
app.get('/', (req, res) => {
    res.send('Hello, World!');
})

// use auth functions in routes folder for /auth path
app.use('/auth', authRoutes);

// open a path for server to receive requests
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));