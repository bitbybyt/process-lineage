const mongoose = require('mongoose');
const Company = require('../model/company');
const Product = require('../model/product');
async function link() {
	await mongoose
		.connect('mongodb://localhost/demomanufacture', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log('Connected to mongodb....'))
		.catch((err) => console.log('Error:' + err));

	const company1 = await Company.findOne({ name: 'dell' });
	const company2 = await Company.findOne({ name: 'lifestyle' });
	const company3 = await Company.findOne({ name: 'urbanclap' });
	const company4 = await Company.findOne({ name: 'dell invoice system' });
	const product1 = await Product.findOne({ name: 'XPS 15' });
	const product2 = await Product.findOne({ name: 'Alienware' });
	const product3 = await Product.findOne({ name: 'Latitude 7490' });
	const product4 = await Product.findOne({ name: 'G5 15 SE' });
	const product5 = await Product.findOne({ name: 'blu t-shirt' });
	const product6 = await Product.findOne({ name: 'honey jeans' });
	const product7 = await Product.findOne({ name: 'Bee Jacket' });
	const product8 = await Product.findOne({ name: 'Span Scarf' });
	const product9 = await Product.findOne({ name: 'Manicure' });
	const product10 = await Product.findOne({ name: 'Hair Cut' });
	const product11 = await Product.findOne({ name: 'Facial' });
	const product12 = await Product.findOne({ name: 'Massage' });
	const product13 = await Product.findOne({ name: 'Bill1' });
	const product14 = await Product.findOne({ name: 'Bill2' });

	company1.products.push(product1);
	company1.products.push(product2);
	company1.products.push(product3);
	company1.products.push(product4);
	await company1.save();

	company2.products.push(product5);
	company2.products.push(product6);
	company2.products.push(product7);
	company2.products.push(product8);
	await company2.save();

	company3.products.push(product9);
	company3.products.push(product10);
	company3.products.push(product11);
	company3.products.push(product12);
	await company3.save();

	company4.products.push(product13);
	company4.products.push(product14);
	await company4.save();

	product1.parent = company1;
	await product1.save();

	product2.parent = company1;
	await product2.save();

	product3.parent = company1;
	await product3.save();

	product4.parent = company1;
	await product4.save();

	product5.parent = company1;
	await product5.save();

	product6.parent = company1;
	await product6.save();

	product7.parent = company1;
	await product7.save();

	product8.parent = company1;
	await product8.save();

	product9.parent = company1;
	await product9.save();

	product10.parent = company1;
	await product10.save();

	product11.parent = company1;
	await product11.save();

	product12.parent = company1;
	await product12.save();

	product13.parent = company1;
	await product13.save();

	product14.parent = company1;
	await product14.save();

	// console.log(product1);

	mongoose.disconnect();

	console.info('Done!');
}

link();
