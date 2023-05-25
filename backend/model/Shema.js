const mongoose = require('mongoose')


// Mongoose Schema
const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
  });
  
  module.exports = mongoose.model('Upload', UserSchema);
