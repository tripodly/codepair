var User = require('../models/user');
var Users = require('../collections/users');
var Pending = require('../models/pending');
var Pendings = require('../collections/pendings');
var Match = require('../models/match');
var Matches = require('../collections/matches');
var Pass = require('../models/pass');
var Passes = require('../collections/passes');
var _ = require('lodash');
var Promise = require('bluebird');
var knex = require('../db/config').knex;

module.exports = {
	// Helper function to signin a user
	// request object: { email: email, password: password }
	signin: function(req, res, next) {

	},

	// Helper function to signup a user
	// request object: { email: email, name: name, language: language, skillLevel: skillLevel, password: password }
	signup: function(req,res, next) {

	},

	editProfileInfo(req, res){
		var userObj = { 
			id: req.user.attributes.id, 
			name: req.user.attributes.name, 
			email: req.user.attributes.email, 
			language: req.user.attributes.language, 
			skillLevel: req.user.attributes.skillLevel, 
			github_handle: req.user.attributes.github_handle, 
			profile_url: req.user.attributes.profile_url 
		};
		var updateProfile = new Promise(function(resolve, reject){
			knex('users')
				.select('*')
			  .where('id', userObj.id)
			  .update({
			    email: req.body.email || undefined,
			    name: req.body.name || undefined ,
			    language: req.body.language || undefined ,
			    skillLevel: req.body.skillLevel || undefined
				})
			  .then(function(response){
				console.log('inside update profile knex update statement');
				console.log('response from profile update query is : ',response);
				resolve(response);
			});
		});

		updateProfile.then(function(response){
			// console.log('response from updateProfile is : ',response);
			console.log('inside promise resolved, userObj is : ',userObj);
			res.send(userObj)
		});
	}
	
};
