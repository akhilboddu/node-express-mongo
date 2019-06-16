const express = require('express')
const router = express.Router()

// Using query string on req obj
router.get('/person', (req, res) => {
    if(req.query.name) {
        res.send(`You have requested a person ${req.query.name}`)
    }
    else {
        res.send('You have requested a person')
    }
})

// Params propery on req object
router.get('/person/:name', (req, res) => {
    res.send(`You have requested a person ${req.params.name}`)
})


module.exports = router