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
	const product13 = await Product.find({ name: 'dx018' });
	const product14 = await Product.find({ name: 'ex023' });
	const product15 = await Product.find({ name: 'fx056' });
	const product16 = await Product.find({ name: 'ax033' });
	const product17 = await Product.find({ name: 'hx089' });
	const product18 = await Product.find({ name: 'fx055' });
	const product19 = await Product.find({ name: 'bx089' });
	const product20 = await Product.find({ name: 'cx021' });
	const product21 = await Product.find({ name: 'cx010' });
	const product22 = await Product.find({ name: 'jx077' });
	const product23 = await Product.find({ name: 'gx027' });
	const product24 = await Product.find({ name: 'fx092' });

	const bill1 = await Bill.findOne({ customerName: 'Barbie Shah' });
	const bill2 = await Bill.findOne({ customerName: 'Spandan Kar' });
	const bill3 = await Bill.findOne({ customerName: 'Natasha Mohanty' });
	const bill4 = await Bill.findOne({ customerName: 'Biswajit Patra' });
	const bill5 = await Bill.findOne({ customerName: 'Rashmi Kejriwal' }); 
	const bill6 = await Bill.findOne({ customerName: 'Tom Avery' });
	const bill7 = await Bill.findOne({ customerName: 'Rahul Gupta' });
	const bill8 = await Bill.findOne({ customerName: 'Shree Computers' });
	const bill9 = await Bill.findOne({ customerName: 'Dell Distributor' });
	const bill10 = await Bill.findOne({ customerName: 'Manan Das' });
	const bill11 = await Bill.findOne({ customerName: 'Croma' });

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

	for (let p in product15) {
		product15[p].parent = company4;
		await product15[p].save();
	}

	for (let p in product16) {
		product16[p].parent = company4;
		await product16[p].save();
	}

	for (let p in product17) {
		product17[p].parent = company4;
		await product17[p].save();
	}

	for (let p in product18) {
		product18[p].parent = company4;
		await product18[p].save();
	}

	for (let p in product19) {
		product19[p].parent = company4;
		await product19[p].save();
	}

	for (let p in product20) {
		product20[p].parent = company4;
		await product20[p].save();
	}

	for (let p in product21) {
		product21[p].parent = company4;
		await product21[p].save();
	}

	for (let p in product22) {
		product22[p].parent = company4;
		await product22[p].save();
	}

	for (let p in product23) {
		product23[p].parent = company4;
		await product23[p].save();
	}

	for (let p in product24) {
		product24[p].parent = company4;
		await product24[p].save();
	}

	bill1.sub.push(product1[1]);
	bill1.sub.push(product1[3]);
	bill1.sub.push(product2[0]);
	bill1.sub.push(product2[1]);
	bill1.sub.push(product2[2]);
	bill1.sub.push(product2[3]);
	bill1.sub.push(product2[4]);
	bill2.sub.push(product1[5]);
	bill2.sub.push(product3[0]);
	bill2.sub.push(product3[2]);
	bill2.sub.push(product3[5]);
	bill3.sub.push(product1[2]);
	bill3.sub.push(product3[8]);
	bill8.sub.push(product3[7]);
	bill8.sub.push(product4[0]);
	bill8.sub.push(product4[1]);
	bill8.sub.push(product4[3]);
	bill8.sub.push(product1[0]);
	bill8.sub.push(product1[4]);
	bill8.sub.push(product1[7]);
	bill8.sub.push(product1[8]);
	bill8.sub.push(product1[9]);
	bill8.sub.push(product1[10]);
	bill8.sub.push(product1[11]);
	bill8.sub.push(product1[12]);
	bill8.sub.push(product1[15]);

	bill4.sub.push(product5[1]);
	bill4.sub.push(product6[2]);
	bill4.sub.push(product6[3]);
	bill5.sub.push(product8[10]);
	bill6.sub.push(product8[4]);
	bill6.sub.push(product8[3]);
	bill7.sub.push(product8[2]);
	bill7.sub.push(product8[0]);
	bill7.sub.push(product6[1]);
	bill7.sub.push(product7[0]);

	bill9.sub.push(product16[2]);
	bill9.sub.push(product20[0]);
	bill10.sub.push(product22[0]);
	bill10.sub.push(product23[0]);
	bill10.sub.push(product24[0]);
	bill11.sub.push(product22[1]);
	bill11.sub.push(product21[0]);

	await bill1.save();
	await bill2.save();
	await bill3.save();
	await bill4.save();
	await bill5.save();
	await bill6.save();
	await bill7.save();
	await bill8.save();
	await bill9.save();
	await bill10.save();
	await bill11.save();

	company1.products.push(...product1);
	company1.products.push(...product2);
	company1.products.push(...product3);
	company1.products.push(...product4);
	company1.bills.push(bill1);
	company1.bills.push(bill2);
	company1.bills.push(bill3);
	company1.bills.push(bill8);
	await company1.save();

	company2.products.push(...product5);
	company2.products.push(...product6);
	company2.products.push(...product7);
	company2.products.push(...product8);
	company2.bills.push(bill4);
	company2.bills.push(bill5);
	company2.bills.push(bill6);
	company2.bills.push(bill7);
	await company2.save();

	company3.products.push(...product9);
	company3.products.push(...product10);
	company3.products.push(...product11);
	company3.products.push(...product12);
	await company3.save();

	company4.products.push(...product13);
	company4.products.push(...product14);
	company4.products.push(...product15);
	company4.products.push(...product16);
	company4.products.push(...product17);
	company4.products.push(...product18);
	company4.products.push(...product19);
	company4.products.push(...product20);
	company4.products.push(...product21);
	company4.products.push(...product22);
	company4.products.push(...product23);
	company4.products.push(...product24);
	company4.bills.push(bill9);
	company4.bills.push(bill10);
	company4.bills.push(bill11);
	await company4.save();

	//console.log(product1[0].eachTime(0));

	// await product1[0].save( 0 );

	mongoose.disconnect();

	console.info('Done!');
}

link();
