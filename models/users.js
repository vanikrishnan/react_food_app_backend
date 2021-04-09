const mongoose = require('mongoose')
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    contactNo: {
        type: Number
    }
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;