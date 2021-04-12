const mongoose = require('mongoose')
const schema = mongoose.Schema;

const cartSchema = new schema({
    itemname: {
        type: String
    },
    price: {
        type: Number
    },
    count: {
        type: Number
    }
})

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
    },
    cartDetails: {
        type: [cartSchema]
    }
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;