const CustomerModel = require('../model/customer.model')
const express = require('express')
const router = express.Router()

// Create a new customer
router.post('/customer', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }
    
    const model = new CustomerModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Get Customer Email
router.get('/customer/:email', (req, res) => {
    if(!req.params.email) return res.status(400).send('Missing URL param email')
    CustomerModel.findOne({
        email: req.params.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Update an existing customer
router.put('/customer/:email', (req, res) => {
    if(!req.params.email) return res.status(400).send('Missing URL param email')
    CustomerModel.findOneAndUpdate({
        email: req.params.email
    }, req.body, {
        new: true
    }
    )
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// delete a customer
router.delete('/customer/:email', (req, res) => {
    if(!req.params.email) return res.status(400).send('Missing URL param email')
    CustomerModel.findOneAndRemove({
        email: req.params.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Get all customers
router.get('/customers', (req, res) => {
    CustomerModel.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router
