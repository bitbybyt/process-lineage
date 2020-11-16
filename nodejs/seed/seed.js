const fs = require('fs');
const mongoose = require('mongoose');
const { Order, Factory, Manufacture, Ship } = require('../model/models');
async function seed() {
	await mongoose
		.connect('mongodb://localhost/demoseed')
		.then(() => console.log('Connected to mongodb....'))
		.catch((err) => console.log('Error:' + err));

	await Order.deleteMany({});
	await Factory.deleteMany({});
	await Manufacture.deleteMany({});
	await Ship.deleteMany({});

	const order = JSON.parse(fs.readFileSync(`${__dirname}/order.json`, 'utf-8'));
	const factory = JSON.parse(
		fs.readFileSync(`${__dirname}/factory.json`, 'utf-8')
	);
	const manufacture = JSON.parse(
		fs.readFileSync(`${__dirname}/manufacture.json`, 'utf-8')
	);
	const ship = JSON.parse(fs.readFileSync(`${__dirname}/ship.json`, 'utf-8'));

	await Order.insertMany(order);
	await Factory.insertMany(factory);
	await Manufacture.insertMany(manufacture);
	await Ship.insertMany(ship);

	mongoose.disconnect();

	console.info('Done!');
}

seed();
