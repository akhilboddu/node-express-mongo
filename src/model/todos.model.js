const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://akhil1234:akhil1234@test-app-afd2r.mongodb.net/test?retryWrites=true&w=majority')

const TodosSchema = new mongoose.Schema({
    text: String,
    complete: Boolean
})

module.exports = mongoose.model('Todos', TodosSchema)