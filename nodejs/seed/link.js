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

	// const product1 = await Product.find({ name: 'XPS 15' });
	// const product2 = await Product.find({ name: 'Alienware' });
	// const product3 = await Product.find({ name: 'Latitude 7490' });
	// const product4 = await Product.find({ name: 'G5 15 SE' });
	// const product5 = await Product.find({ name: 'Blu t-shirt' });
	// const product6 = await Product.find({ name: 'Honey Jeans' });
	// const product7 = await Product.find({ name: 'Bee Jacket' });
	// const product8 = await Product.find({ name: 'Span Scarf' });
	// const product9 = await Product.find({ name: 'Manicure' });
	// const product10 = await Product.find({ name: 'Hair Cut' });
	// const product11 = await Product.find({ name: 'Facial' });
	// const product12 = await Product.find({ name: 'Massage' });
	// const product13 = await Product.find({ name: 'Bill1' });
	const product14 = await Product.find({ name: 'Bill2' });

	// const bill1 = await Bill.findOne({ name: 'Barbie Shah' });
	// const bill2 = await Bill.findOne({ name: 'Spandan Kar' });
	// const bill3 = await Bill.findOne({ name: 'Natasha Mohanty' });
	// const bill4 = await Bill.findOne({ name: 'Biswajit Patra' });
	// const bill5 = await Bill.findOne({ name: 'Dummy1' });
	// const bill6 = await Bill.findOne({ name: 'Tom Avery' });

	// company1.products.push(product1);
	// company1.products.push(product2);
	// company1.products.push(product3);
	// company1.products.push(product4);
	// await company1.save();

	// company2.products.push(product5);
	// company2.products.push(product6);
	// company2.products.push(product7);
	// company2.products.push(product8);
	// await company2.save();

	// company3.products.push(product9);
	// company3.products.push(product10);
	// company3.products.push(product11);
	// company3.products.push(product12);
	// await company3.save();

	// company4.products.push(product13);
	company4.products.push(...product14);
	await company4.save();

	// product1.parent = company1;
	// await product1.save();

	// product2.parent = company1;
	// await product2.save();

	// product3.parent = company1;
	// await product3.save();

	// product4.parent = company1;
	// await product4.save();

	// product5.parent = company1;
	// await product5.save();

	// product6.parent = company1;
	// await product6.save();

	// product7.parent = company1;
	// await product7.save();

	// product8.parent = company1;
	// await product8.save();

	// product9.parent = company1;
	// await product9.save();

	// product10.parent = company1;
	// await product10.save();

	// product11.parent = company1;
	// await product11.save();

	// product12.parent = company1;
	// await product12.save();

	// product13.parent = company1;
	// await product13.save();

	// product14.parent = company1;
	// await product14.save();

	console.log(product14);

	mongoose.disconnect();

	console.info('Done!');
}

link();
