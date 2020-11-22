const express = require('express');
const mongoose = require('mongoose');
const Bill = require('../model/bill');
const Company = require('../model/company');
const Product = require('../model/product');
const User = require('../model/user');

const router = express.Router();
router.get('/company', async (req, res) => {
	const company = await Company.find().populate('products').populate('bills');
	res.send(company);
});
router.get('/bill', async (req, res) => {
	const bill = await Bill.find().populate('sub');
	res.send(bill);
});
router.get('/product', async (req, res) => {
	const product = await Product.find().populate('companies');
	res.send(product);
});
router.get('/product/eachTime/:currentproductID/:i', async (req, res) => {
	try {
		const product = await Product.findById(
			req.params.currentproductID
		).populate('parent');
		//const t = { time: 1 };
		const t = await product.eachTime(req.params.i);
		//console.log(t.time);
		console.log(t);
		res.send(t);
	} catch (err) {
		return res.status(400).send('Error on Each Time');
	}
});
router.get('/product/tillTime/:currentproductID/:i', async (req, res) => {
	try {
		const product = await Product.findById(
			req.params.currentproductID
		).populate('parent');
		const t = await product.tillTime(req.params.i);
		res.send(t.toString());
	} catch (err) {
		return res.status(400).send('Error on Till Time');
	}
});
router.get(
	'/product/propagationTime/:currentproductID',
	async (req, res) => {
		try {
			const product = await Product.findById(
				req.params.currentproductID
			).populate('parent');
			const t = await product.propagationTime();
			res.send(t);
		} catch (err) {
			return res.status(400).send('Error on Propagation Time');
		}
	}
);
router.get('/product/allEachTime/:currentproductname/:i', async (req, res) => {
	try {
		//const product = await Product.find().populate('parent');
		//console.log(req.params.currentproductname);
		//console.log(req.params.i);
		//console.log(typeof parseInt(req.params.i));
		const t = await Product.alleachTime(
			req.params.currentproductname,
			parseInt(req.params.i)
		);
		res.send(t);
	} catch (err) {
		return res.status(400).send('Error on AllEachTime');
	}
});
router.get('/product/allTillTime/:currentproductname/:i', async (req, res) => {
	try {
		const t = await Product.alltillTime(
			req.params.currentproductname,
			parseInt(req.params.i)
		);
		res.send(t.toString());
	} catch (err) {
		return res.status(400).send('Error on AllTillTime');
	}
});
router.get('/company/bill/:currentcompanyID/:sel', async (req, res) => {
	const { currentcompanyID, sel } = req.params;
	try {
		const company = await Company.findById(currentcompanyID)
			.populate('products')
			.populate('bills')
			.populate({ path: 'bills', populate: ['sub'] });
		console.log(company);
		const bill = await company.getBills(sel);
		console.log(bill);
		res.send(bill);
	} catch (err) {
		return res.status(400).send('Error on Date Selection');
	}
});

router.post('/user', async (req, res) => {
	try {
		const user = await User.find({ username: req.body.username });
		if (user[0].password === req.body.password) {
			const token = await user[0].generateAuthToken(req.body.currentcompany);
			res.send(token);
		} else {
			return res.status(400).send('invalid password');
		}
	} catch (err) {
		return res.status(400).send('invalid username');
	}
});

module.exports = router;
