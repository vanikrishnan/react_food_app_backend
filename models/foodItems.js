const mongoose = require('mongoose')
const schema = mongoose.Schema;

const foodSchema = new schema({
    itemname: {
        type: String
    },
    availabletime: {
        type: String
    },
    price: {
        type: Number
    }
})

const foodModel = mongoose.model('fooditems', foodSchema);

module.exports = foodModel;