const mongoose = require('mongoose');
const Product = require('./product');
const Bill = require('./bill');

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
	],
});

companySchema.methods.getBills = async function (sel) {
	// this.populate('product');
	// console.log(this);
	const d = new Date();
	let t;
	let ret = [];
	const foundBill = await this.bills;
	// console.log(foundBill);
	for (let i in foundBill) {
		// console.log(foundBill[i]);
		t = d - foundBill[i].date;
		// console.log(t);
		if (sel == 1) {
			//today
			if (t < 86400000) {
				ret += foundBill[i];
			}
		} else if (sel == 2) {
			//last week
			if (t < 604800000) {
				ret += foundBill[i];
			}
		} else if (sel == 3) {
			//last month
			if (t < 2592000000) {
				ret += foundBill[i];
			}
		} else ret += foundBill[i];
	}
	return ret;
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
