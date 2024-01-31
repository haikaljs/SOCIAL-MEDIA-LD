const express = require('express')
const app = express()
const mongoose = require('mongoose')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

// connect to mongodb
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connection to mongodb success!');
})

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))



app.listen(8800, ()=> {
console.log('Backend server is running...');
})