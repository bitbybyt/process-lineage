const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
	customer: {
		name: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
	},
	orderDetail: {
		productName: {
			type: String,
			required: true,
		},
		productId: {
			type: Number,
			required: true,
		},
		qty: {
			type: Number,
			default: 1,
		},
	},
	internalUse: {
		isManufacture: {
			type: Boolean,
			default: true,
		},
	},
	// time: Date
	time: {
		type: Date,
		default: Date.now,
	},
});

const factorySchema = new mongoose.Schema({
	location: {
		type: String,
		required: true,
	},
	allProduct: [
		{
			productId: {
				type: Number,
				required: true,
			},
			availableQty: {
				type: Number,
				default: 0,
			},
		},
	],
	// time: Date
	time: {
		type: Date,
		default: Date.now,
	},
});

const manufactureSchema = new mongoose.Schema({
	productId: {
		type: Number,
		required: true,
	},
	assembly: {
		isComplete: { type: Boolean, default: false },
		// time: Date
		time: {
			type: Date,
			default: Date.now,
		},
	},
	testing: {
		isComplete: { type: Boolean, default: false },
		// time: Date
		time: {
			type: Date,
			default: Date.now,
		},
	},
	packaging: {
		isComplete: { type: Boolean, default: false },
		// time: Date
		time: {
			type: Date,
			default: Date.now,
		},
	},
});

const shipSchema = new mongoose.Schema({
	productId: {
		type: Number,
		required: true,
	},
	ship: {
		isComplete: { type: Boolean, default: false },
		// time: Date
		time: {
			type: Date,
			default: Date.now,
		},
	},
});
const Order = mongoose.model('Order', orderSchema);
const Factory = mongoose.model('Factory', factorySchema);
const Manufacture = mongoose.model('Manufacture', manufactureSchema);
const Ship = mongoose.model('Ship', shipSchema);

module.exports = {
	Order,
	Factory,
	Manufacture,
	Ship,
};
