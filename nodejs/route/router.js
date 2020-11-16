const express = require('express');
const mongoose = require('mongoose');
const { Factory, Order, Manufacture, Ship } = require('../model/models');
const router = express.Router();
router.get('/order', async (req, res) => {
	const order = await Order.find();
	res.send(order);
});
router.get('/factory', async (req, res) => {
	const factory = await Factory.find();
	res.send(factory);
});
router.get('/manufacture', async (req, res) => {
	const manufacture = await Manufacture.find();
	res.send(manufacture);
});
router.get('/ship', async (req, res) => {
	const ship = await Ship.find();
	res.send(ship);
});
router.post('/order', async (req, res) => {
	const order = await new Order({
		customer: {
			name: req.body.customer.name,
			location: req.body.customer.location,
		},
		orderDetail: {
			productName: req.body.orderDetail.productName,
			productId: req.body.orderDetail.productId,
			qty: req.body.orderDetail.qty,
		},
	});
	const result = await order.save();
	res.send(result);
});
router.post('/factory', async (req, res) => {
	let array = req.body.allProduct.map((allProduct) => allProduct);
	const factory = await new Factory({
		location: req.body.location,
		allProduct: [...array],
	});
	const result = await factory.save();
	res.send(result);
});
router.post('/manufacture', async (req, res) => {
	/*const manufacture = await new Manufacture({
		productId: req.body.productId,
		assembly: {
			isComplete: req.body.assembly.isComplete,
			// time: Date
		},
		testing: {
			isComplete: req.body.testing.isComplete,
			// time: Date
		},
		packaging: {
			isComplete: req.body.packaging.isComplete,
			// time: Date
		},
    }); */
	const manufacture = await new Manufacture({
		productId: req.body.productId,
	});
	s;
	const result = await manufacture.save();
	res.send(result);
});
router.post('/ship', async (req, res) => {
	/*const ship = await new Ship({
		productId: req.body.productId,
		ship: {
			isComplete: req.body.ship.isComplete,
			//time: Date
		},
    });*/
	const ship = await new Ship({
		productId: req.body.productId,
	});
	const result = await ship.save();
	res.send(result);
});

router.post('/order/:id', async (req, res) => {
	const order = await Order.findById(req.params.id);
	res.send(order);
});

module.exports = router;
