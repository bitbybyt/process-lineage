const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const orderSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});
const Order = mongoose.model('order', orderSchema);
const factorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});
const Factory = mongoose.model('factory', factorySchema);
const shipmentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 5,
		maxlength: 50,
	},
});
const Shipment = mongoose.model('shipment', shipmentSchema);
router.get('/order', async (req, res) => {
	const order = await Order.find();
	res.send(order);
	console.log(order);
});
router.post('/order', async (req, res) => {
	const order = new Order({
		name: req.body.name,
	});
	const result = await order.save();
	res.send(result);
});
router.get('/factory', async (req, res) => {
	const factory = await Factory.find();
	res.send(factory);
});
router.post('/factory', async (req, res) => {
	const factory = new Factory({
		name: req.body.name,
	});
	const result = await factory.save();
	res.send(result);
});
router.get('/shipment', async (req, res) => {
	const shipment = await Shipment.find();
	res.send(shipment);
});
router.post('/shipment', async (req, res) => {
	const shipment = new Factory({
		name: req.body.name,
	});
	const result = await shipment.save();
	res.send(result);
});
module.exports = router;
