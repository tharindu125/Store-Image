const express = require('express')
const userSchema = require('../model/Shema')

const router = express.Router()


router.post('/', async (req, res) => {
    try {
      const {name, age } = req.body;
  
      const newUser = new userSchema({name, age });

      const savedUser = await newUser.save();
      res.status(201).json( { file: req.file, savedUser});

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router