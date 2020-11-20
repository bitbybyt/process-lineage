const fs = require('fs');
const mongoose = require('mongoose');
const Company = require('../model/company');
const Product = require('../model/product');
const Bill = require('../model/bill');
const User = require('../model/user');
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
	await Bill.deleteMany({});
	await User.deleteMany({});

	const company = JSON.parse(
		fs.readFileSync(`${__dirname}/company.json`, 'utf-8')
	);
	const product = JSON.parse(
		fs.readFileSync(`${__dirname}/product.json`, 'utf-8')
	);
	const bill = JSON.parse(fs.readFileSync(`${__dirname}/bill.json`, 'utf-8'));
	const user = JSON.parse(fs.readFileSync(`${__dirname}/user.json`, 'utf-8'));
	await Company.insertMany(company);
	await Product.insertMany(product);
	await Bill.insertMany(bill);
	await User.insertMany(user);

	mongoose.disconnect();

	console.info('Done!');
}

seed();
