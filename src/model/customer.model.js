const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://akhil1234:' + process.env.MONGO_ATLAS_PW + '@test-app-afd2r.mongodb.net/test?retryWrites=true&w=majority')

const CustomerSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)