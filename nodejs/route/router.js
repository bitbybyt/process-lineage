const express = require('express');
const mongoose = require('mongoose');
const Company = require('../model/company');
const Product = require('../model/product');

const router = express.Router();
router.get('/company', async (req, res) => {
	const company = await Company.find().populate('products');
	res.send(company);
});
router.get('/product', async (req, res) => {
	const product = await Product.find().populate('companies');
	res.send(product);
});
module.exports = router;
