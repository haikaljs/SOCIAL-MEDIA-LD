const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connection to mongodb success!');
})

app.listen(8800, ()=> {
console.log('Backend server is running...');
})