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
	const d = new Date();
	let t;
	let ret = new Array();
	// console.log(typeof ret);
	const foundBill = await this.bills;
	// console.log(foundBill);
	for (let i in foundBill) {
		t = d - foundBill[i].date;

		if (sel == 1) {
			//today
			if (t < 86400000) {
				ret.push(foundBill[i]);
			}
		} else if (sel == 2) {
			//last week
			if (t < 604800000) {
				ret.push(foundBill[i]);
			}
		} else if (sel == 3) {
			//last month
			if (t < 2592000000) {
				ret.push(foundBill[i]);
			}
		} else ret.push(foundBill[i]);
	}
	// console.log(typeof ret);
	return ret;
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
