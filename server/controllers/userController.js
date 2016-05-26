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

var userHelpers = {
	// Helper function to signin a user
	// request object: { email: email, password: password }
	signin: function(req, res, next) {

	},

	// Helper function to signup a user
	// request object: { email: email, name: name, language: language, skillLevel: skillLevel, password: password }
	signup: function(req,res, next) {

	},

	getCards: function(req, res, next) {
		var currentUser = req.user.attributes;
		var currentUserId = req.user.attributes.id;
		var userObject = { 
			id: currentUser.id, 
			name: currentUser.name, 
			email: currentUser.email, 
			language: currentUser.language, 
			skillLevel: currentUser.skillLevel, 
			github_handle: currentUser.github_handle, 
			profile_url: currentUser.profile_url 
		};

		// Query to select matches array
		var matchesPromise = new Promise(function(resolve,reject){
			knex('users').select('*').whereIn('id', 
			knex('matches').select('fromUser').where('toUser',currentUserId).union([
				knex('matches').select('toUser').where('fromUser',currentUserId)
			]))
			.then(function(response){
				console.log('inside MATCHES knex select statement');
				console.log('response from MATCHES select query is : ',response);
				resolve(response);
			});
		});

		// Query to select initiated array
		var initiatedPromise = new Promise(function(resolve,reject){
			knex('users').select('*').whereIn('id', knex('pendings').select('fromUser').where('toUser',currentUserId))
			.then(function(response){
				console.log('inside PENDINGS knex select statement');
				console.log('response from PENDINGS select query is : ',response);
				resolve(response);
			});
		});

		// Query to select users for uninitiated array
		var uninitiatedPromise = new Promise(function(resolve,reject){
			knex('users').select('*').whereNotIn('id', 
			knex('pendings').select('fromUser').where('toUser',currentUserId).union([
				knex('pendings').select('toUser').where('fromUser',currentUserId),
				knex('matches').select('fromUser').where('toUser',currentUserId),
				knex('matches').select('toUser').where('fromUser',currentUserId),
				knex('passes').select('fromUser').where('toUser',currentUserId),
				knex('passes').select('toUser').where('fromUser',currentUserId),
				knex('users').select('id').where('id',currentUserId)
			]))
			.then(function(response){
				console.log('inside OTHERS knex select statement');
				console.log('response from OTHERS select query is : ',response);
				resolve(response);
			});
		});

		Promise.all([matchesPromise, initiatedPromise, uninitiatedPromise]).then(function(values){
			console.log('inside Promise.all values array is : ',values);
			res.send({ id: userObject.id, name: userObject.name, email: userObject.email, language: userObject.language, skillLevel: userObject.skillLevel, github_handle: userObject.github_handle, profile_url: userObject.profile_url,
				cards: {
					uninitiated: values[2],
					initiated: values[1],
					matched: values[0]
				}
			});
		});
		
	},

	editProfileInfo(req, res){
		console.log('inside editprofileinfo in usercontroller, req is = ',req)
		var currentUser = req.user.attributes;
		var currentUserId = req.user.attributes.id;
		var userObj = { 
			id: currentUserId.id, 
			name: currentUserId.name, 
			email: currentUserId.email, 
			language: currentUserId.language, 
			skillLevel: currentUserId.skillLevel, 
			github_handle: currentUserId.github_handle, 
			profile_url: currentUserId.profile_url 
		};
		var updateProfile = new Promise(function(resolve, reject){
			knex('users')
			  .where('id', '=', userObj.id)
			  .update({
			    email: userObj.email || undefined,
			    name: userObj.name || undefined ,
			    language: userObj.language || undefined ,
			    skillLevel: userObj.skillLevel || undefined
				})
			  .then(function(response){
				console.log('inside update profile knex update statement');
				console.log('response from profile update query is : ',response);
				resolve(response);
			});
		});

		updateProfile.then(function(response){
			console.log('response from updateProfile is : ',response);
			res.send({	
				id: userObject.id, 
				name: userObject.name, 
				email: userObject.email, 
				language: userObject.language, 
				skillLevel: userObject.skillLevel
			})
		});
	},
	getMatchedUsers: function(currentUserId) {
		var matches = [];
		return new Promise(function(resolve, reject) {
			Matches.fetch().then(function(matches){
				_.forEach(matches.models, function(match, index, collection){
					if(match.attributes.fromUser == currentUserId) {
						new User({ id: match.attributes.toUser }).fetch().then(function(matchUser){
							matches.push(matchUser);
							if(index === collection.length - 1) {
								console.log('end of forEach iterator');
								resolve(matches);
							}
						})
					}
					else if(match.attributes.toUser == currentUserId) {
						new User({ id: match.attributes.fromUser }).fetch().then(function(matchUser){
							matches.push(matchUser);
							if(index === collection.length - 1) {
								console.log('end of forEach iterator');
								resolve(matches);
							}
						})
					}
					else {
						if(index === collection.length - 1) {
							console.log('end of forEach iterator');
							resolve(matches);
						}
					}
				})
			})
		})	

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