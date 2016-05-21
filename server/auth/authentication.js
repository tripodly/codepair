// All authentication functionality in here
const jwt = require('jwt-simple');
const User = require('../models/user');
const Users = require('../collections/users');
// import JWT secret from here
const EnvConfig = require('../config/envConfig');

function tokenForUser(user) {
	console.log('tokenForUser fired');
	console.log('user id is : ',user.id);
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, EnvConfig.secret);
}

// Signin function
exports.signin = function(req, res, next) {
	console.log('signin in authentication fired!');
	res.send({ token: tokenForUser(req.user) });
}

// Signup function
exports.signup = function(req, res, next) {
	const email = req.body.email;
	const name = req.body.name;
	const language = req.body.language;
	const skillLevel = req.body.skillLevel;
	const password = req.body.password;

	if(!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

	// See if a user with given email exists
	new User({ email: email }).fetch().then(function(found) {

		// If a user with email does exist, return an error
		if (found) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// If a use with email does NOT exist, create and save user record
		const user = new User({
			email: email,
			name: name,
			language: language,
			skillLevel: skillLevel,
			password: password
		});

		user.save().then(function(newUser) {
			console.log('user saved in auth signup');
			Users.add(newUser);

			// Respond to request indicating the user was created
			res.json({ token: tokenForUser(user) });
		});
	});
}