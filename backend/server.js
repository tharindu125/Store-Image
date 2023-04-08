require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const sampleRoute = require('./route/sampleRoute')

//Express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/sample', sampleRoute)

//connect to mongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT , () => {
            console.log("conneced to DB, port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })