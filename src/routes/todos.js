/** Demo model */
const TodosModel = require('../model/todos.model')
const express = require('express')
const router = express.Router()

// Create new Todo
router.post('/todo', (req, res) => {
    if(!req.body) {
        return res.status(400).send('Request body is missing')
    }
    
    let newObj = {
        ...req.body,
        complete: false
    }
    const model = new TodosModel(newObj)
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

// Get Todo
router.get('/todo/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('Missing URL param id')
    TodosModel.findById(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Update an existing customer
router.put('/todo/complete/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('Missing URL param id')
    const newObj = {
        ...req.body,
        complete: !req.body.complete
    }
    console.log(newObj, 'testing')
    TodosModel.findByIdAndUpdate(req.params.id, newObj, {new: true})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// delete a customer
router.delete('/todo/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send('Missing URL param id')
    TodosModel.findByIdAndRemove(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// Get all customers
router.get('/todos', (req, res) => {
    TodosModel.find()
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


module.exports = router
