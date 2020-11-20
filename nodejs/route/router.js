const express = require('express');
const mongoose = require('mongoose');
const Company = require('../model/company');
const Product = require('../model/product');
const User = require('../model/user');

const router = express.Router();
router.get('/company', async (req, res) => {
	const company = await Company.find().populate('products');
	res.send(company);
});
router.get('/product', async (req, res) => {
	const product = await Product.find().populate('companies');
	res.send(product);
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
