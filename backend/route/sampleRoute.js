const express = require('express')
const sampleModel = require('../model/sample')

const router = express.Router()

//POST
router.post('/' , async(req, res) => {
    const {name} = req.body
    //add doc to db

    try{
        const sample = await sampleModel.create({name})
        res.status(200).json(sample)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

})

module.exports = router