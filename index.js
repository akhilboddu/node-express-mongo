const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

// const customerRoute = require('./src/routes/customer')
// const personRoute = require('./src/routes/person')
const todoRoute = require('./src/routes/todos')

app.use(bodyParser.json()) 

app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})
app.use(todoRoute)
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

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.info(`Server has started running on port ${PORT}`))