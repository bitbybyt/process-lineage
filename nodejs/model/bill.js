const mongoose = require('mongoose');
const Product = require('./product');
const Company = require('./company');

const billSchema = new mongoose.Schema({
    customerName: String,
    date: {
        type: Date,
        default: Date.now
    },
    sub: [
        {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
    ]
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Company;

