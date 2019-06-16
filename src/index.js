const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

const customerRoute = require('./routes/customer')
const personRoute = require('./routes/person')

app.use(bodyParser.json()) 

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})
app.use(personRoute)
app.use(customerRoute)
app.use(express.static('public'))

// Handler for 404 error - resource not found
app.use((req,res,next) => {
    res.status(404).send('Sorry, you might be lost')
})

// Handler for 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info(`Server has started running on port ${PORT}`))