const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sampleSchema = new Schema({
    name:{
        type: String
    }
    
}, {timestamps:true})

module.exports = mongoose.model("ImageTest", sampleSchema)