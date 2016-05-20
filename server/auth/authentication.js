// All authentication functionality in here
const jwt = require('jwt-simple');
const User = require('./models/user');
// import JWT secret from here
const EnvConfig = require('../config/envConfig');

// Signin function
exports.signin = function(req, res, next) {
	res.send({ message: 'hello' });
}