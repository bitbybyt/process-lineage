const mongoose = require('mongoose');
const Company = require('../model/company');
const Product = require('../model/product');
const Bill = require('../model/bill');

async function link() {
	await mongoose
		.connect('mongodb://localhost/demomanufacture', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to mongodb....'))
		.catch((err) => console.log('Error:' + err));

	const company1 = await Company.findOne({ name: 'Dell' });
	const company2 = await Company.findOne({ name: 'Lifestyle' });
	const company3 = await Company.findOne({ name: 'Urbanclap' });
	const company4 = await Company.findOne({ name: 'Dell Invoice System' });

	const product1 = await Product.find({ name: 'XPS 15' });
	const product2 = await Product.find({ name: 'Alienware' });
	const product3 = await Product.find({ name: 'Latitude 7490' });
	const product4 = await Product.find({ name: 'G5 15 SE' });
	const product5 = await Product.find({ name: 'Blu t-shirt' });
	const product6 = await Product.find({ name: 'Honey Jeans' });
	const product7 = await Product.find({ name: 'Bee Jacket' });
	const product8 = await Product.find({ name: 'Span Scarf' });
	const product9 = await Product.find({ name: 'Manicure' });
	const product10 = await Product.find({ name: 'Hair Cut' });
	const product11 = await Product.find({ name: 'Facial' });
	const product12 = await Product.find({ name: 'Massage' });
	const product13 = await Product.find({ name: 'Bill1' });
	const product14 = await Product.find({ name: 'Bill2' });

	const bill1 = await Bill.findOne({ customerName: 'Barbie Shah' });
	const bill2 = await Bill.findOne({ customerName: 'Spandan Kar' });
	const bill3 = await Bill.findOne({ customerName: 'Natasha Mohanty' });
	const bill4 = await Bill.findOne({ customerName: 'Biswajit Patra' });
	const bill5 = await Bill.findOne({ customerName: 'Dummy1' });
	const bill6 = await Bill.findOne({ customerName: 'Tom Avery' });

	// console.log(bill1);

	for (let p in product1) {
		product1[p].parent = company1;
		await product1[p].save();
	}

	for (let p in product2) {
		product2[p].parent = company1;
		await product2[p].save();
	}

	for (let p in product3) {
		product3[p].parent = company1;
		await product3[p].save();
	}

	for (let p in product4) {
		product4[p].parent = company1;
		await product4[p].save();
	}

	for (let p in product5) {
		product5[p].parent = company2;
		await product5[p].save();
	}

	for (let p in product6) {
		product6[p].parent = company2;
		await product6[p].save();
	}

	for (let p in product7) {
		product7[p].parent = company2;
		await product7[p].save();
	}

	for (let p in product8) {
		product8[p].parent = company2;
		await product8[p].save();
	}

	for (let p in product9) {
		product9[p].parent = company3;
		await product9[p].save();
	}

	for (let p in product10) {
		product10[p].parent = company3;
		await product10[p].save();
	}

	for (let p in product11) {
		product11[p].parent = company3;
		await product11[p].save();
	}

	for (let p in product12) {
		product12[p].parent = company3;
		await product12[p].save();
	}

	for (let p in product13) {
		product13[p].parent = company4;
		await product13[p].save();
	}

	for (let p in product14) {
		product14[p].parent = company4;
		await product14[p].save();
	}

	bill1.sub.push(product1[0]);
	bill1.sub.push(product2[0]);
	bill2.sub.push(product5[0]);
	bill2.sub.push(product6[0]);
	bill3.sub.push(product10[0]);
	bill4.sub.push(product13[0]);
	bill4.sub.push(product14[0]);
	bill4.sub.push(product14[1]);
	bill4.sub.push(product14[2]);
	bill5.sub.push(product2[0]);
	bill6.sub.push(product14[4]);
	bill6.sub.push(product14[5]);
	bill6.sub.push(product14[6]);

	await bill1.save();
	await bill2.save();
	await bill3.save();
	await bill4.save();
	await bill5.save();
	await bill6.save();

	company1.products.push(...product1);
	company1.products.push(...product2);
	company1.products.push(...product3);
	company1.products.push(...product4);
	company1.bills.push(bill1);
	company1.bills.push(bill5);
	await company1.save();

	company2.products.push(...product5);
	company2.products.push(...product6);
	company2.products.push(...product7);
	company2.products.push(...product8);
	company2.bills.push(bill2);
	await company2.save();

	company3.products.push(...product9);
	company3.products.push(...product10);
	company3.products.push(...product11);
	company3.products.push(...product12);
	company3.bills.push(bill3);
	await company3.save();

	company4.products.push(...product13);
	company4.products.push(...product14);
	company4.bills.push(bill4);
	company4.bills.push(bill6);
	await company4.save();

	//console.log(product1[0].eachTime(0));

	// await product1[0].save( 0 );

	mongoose.disconnect();

	console.info('Done!');
}

link();
