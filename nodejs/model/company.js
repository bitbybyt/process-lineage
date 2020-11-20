const mongoose = require('mongoose');
const Product = require('./product');
const Bil = require('./bill');

const companySchema = new mongoose.Schema({
	name: String,
	process: [
		{
			category: {
				type: String,
				lowercase: true,
				enum: ['decision', 'activity'],
			},
			processName: String,
			timeExpected: {
				type: Date,
			},
		},
	],
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Product',
		},
	],
	bills: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Bill',
		},
	]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
