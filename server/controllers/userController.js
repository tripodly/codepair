var User = require('../models/user');
var Users = require('../collections/users');

var userHelpers = {
	// Helper function to signin a user
	// request object: { email: email, password: password }
	signin: function(req, res, next) {

	},

	// Helper function to signup a user
	// request object: { email: email, name: name, language: language, skillLevel: skillLevel, password: password }
	signup: function(req,res, next) {

	},

	// Helper function to check authorization status of a user
	// request object will have header with token on it
	checkAuth: function(req, res, next) {

	},

	// Helper function to create new user record in database
	// user object passed in has properties: name, email, password, profile_url, language, skillLevel
	createUser: function(user, res) {

	}
};

module.exports = userHelpers;