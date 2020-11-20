const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userschema = new mongoose.Schema({
	username: {
		type: String,
		minlength: 1,
		maxlength: 50,
	},
	password: {
		type: String,
		minlength: 1,
		maxlength: 1050,
	},
});

userschema.methods.generateAuthToken = async function (currentcompany) {
	const token = jwt.sign(
		{
			_id: this._id,
			username: this.username,
			password: this.password,
			currentcompany: currentcompany,
		},
		'mykey'
	);
	return token;
};
const User = mongoose.model('user', userschema);

module.exports = User;
