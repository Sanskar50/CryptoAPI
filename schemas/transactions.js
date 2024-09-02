const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    ethereum_price: {
        type: Number,
        required: true
    },
    transactions: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('Crypto', transactionsSchema);