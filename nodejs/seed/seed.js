const fs = require('fs');
const mongoose = require('mongoose');
const Company = require('../model/company');
const Product = require('../model/product');
const Bill = require('../model/bill');
async function seed() {
	await mongoose
		.connect('mongodb://localhost/demomanufacture', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to mongodb....'))
		.catch((err) => console.log('Error:' + err));

	await Company.deleteMany({});
	await Product.deleteMany({});

	const company = JSON.parse(
		fs.readFileSync(`${__dirname}/company.json`, 'utf-8')
	);
	const product = JSON.parse(
		fs.readFileSync(`${__dirname}/product.json`, 'utf-8')
	);
	const bill = JSON.parse(
		fs.readFileSync(`${__dirname}/bill.json`, 'utf-8')
	);

	await Company.insertMany(company);
	await Product.insertMany(product);
	await Product.insertMany(bill);

	mongoose.disconnect();

	console.info('Done!');
}

seed();
