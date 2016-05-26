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
		console.log('getCards fired inside userController');
		console.log('req user id is : ',req.user.attributes.id);

		var initiateModel = new Pending({ toUser: req.user.attributes.id });
		var initiated = Pendings.where(initiateModel);
		// console.log('userController - initated at line 31 is : ', initiated);
		var uninitiated = [];
		var matched = [];

		var currentUser = new User({ id: req.user.attributes.id });

		Users.fetch().then(function(collection){
			console.log('collection created after Users.fetch(), collection length is : ',collection.length);
			collection.remove(currentUser);
			console.log('current user removed from collection, collection length is now : ',collection.length);

			var pendingsDone = false, matchesDone = false, passesDone = false;

			var pendingIDs = [];
			var pendingUsers = [];

			Pendings.fetch().then(function(pendings){
				_.forEach(pendings.models, function(pending){
					var pendingUser;

					if(pending.attributes.fromUser == req.user.attributes.id) {
						// console.log('inside first if in pendings fetch : ',collection.get(pending.attributes.toUser));
						
						// Removes pending user from collection
						// pendingUser = new User({ id: pending.attributes.toUser });

						// pendingUsers.push(collection.get(pending.attributes.toUser));
						collection.remove(collection.get(pending.attributes.toUser));

						pendingIDs.push(pending.attributes.toUser)
					}
					if(pending.attributes.toUser == req.user.attributes.id) {
						// Removes pending user from collection
						// pendingUser = new User({ id: pending.attributes.fromUser });

						pendingUsers.push(collection.get(pending.attributes.fromUser));
						collection.remove(collection.get(pending.attributes.fromUser));

						pendingIDs.push(pending.attributes.fromUser)
					}
				})
				// console.log('pendingIDs after for each are : ',pendingIDs)
				// console.log('pendingUsers after for each are : ',pendingUsers)
				pendingsDone = true;
			})

			var matchIDs = [];
			var matchUsers = [];

			Matches.fetch().then(function(matches){
				_.forEach(matches.models, function(match){
					var matchUser;

					if(match.attributes.fromUser == req.user.attributes.id) {
						// console.log('inside first if in matches fetch : ',collection.get(match.attributes.toUser));

						// Removes matched user from collection
						// matchUser = new User({ id: match.attributes.toUser });

						matchUsers.push(collection.get(match.attributes.toUser));
						matched.push(collection.get(match.attributes.toUser));
						collection.remove(collection.get(match.attributes.toUser));

						matchIDs.push(match.attributes.toUser)
					}
					if(match.attributes.toUser == req.user.attributes.id) {
						// Removes matched user from collection
						// matchUser = new User({ id: match.attributes.fromUser });

						matchUsers.push(collection.get(match.attributes.fromUser));
						matched.push(collection.get(match.attributes.fromUser));
						collection.remove(collection.get(match.attributes.fromUser));

						matchIDs.push(match.attributes.fromUser)
					}
				})

				// console.log('matchIDs after for each are : ',matchIDs)
				// console.log('matchUsers after for each are : ',matchUsers)
				matchesDone = true;
			})

			var passIDs = [];
			var passUsers = [];

			Passes.fetch().then(function(passes){
				_.forEach(passes.models, function(pass){
					var passUser;

					if(pass.attributes.fromUser == req.user.attributes.id) {
						// console.log('inside first if in passes fetch : ',collection.get(pass.attributes.toUser));
						// Removes matched user from collection
						// passUser = new User({ id: pass.attributes.toUser });

						passUsers.push(collection.get(pass.attributes.toUser));
						collection.remove(collection.get(pass.attributes.toUser));

						passIDs.push(pass.attributes.toUser)
					}
					if(pass.attributes.toUser == req.user.attributes.id) {
						// console.log('inside second if in passes fetch : ',collection.get(pass.attributes.fromUser));
						// Removes matched user from collection
						// passUser = new User({ id: pass.attributes.fromUser });

						passUsers.push(collection.get(pass.attributes.fromUser));
						collection.remove(collection.get(pass.attributes.fromUser));

						passIDs.push(pass.attributes.fromUser)
					}
				})

				// console.log('passIDs after for each are : ',passIDs)
				// console.log('passUsers after for each are : ',passUsers)
				passesDone = true;
			})

			// if(pendingsDone && matchesDone && passesDone) {
			// 	console.log('inside USERS PROMISE uninitiated array is : ',collection);
			// 	console.log('inside USERS PROMISE initiated array is : ',initiated);
			// 	next();
			// }

			// uninitiated = collection.models.filter(function(user){
			// 	return (_.includes(matchIDs, user.id)) && (_.includes(passIDs, user.id)) && (_.includes(pendingIDs, user.id))
			// }).map(function(user){
			// 	return user.attributes;
			// });i

			setTimeout(function(){
				// console.log('inside getCards uninitiated array is : ',collection.models);
				// console.log('inside getCards initiated array is : ',initiated);
				// console.log('inside getCards matched array is : ',matched);
				// res.cards.uninitiated = collection.models;
				// res.cards.initiated = initiated;
				// res.cards.matched = matched;
				var user = req.user.attributes;
				res.send({ id: user.id, name: user.name, email: user.email, language: user.language, skillLevel: user.skillLevel, github_handle: user.github_handle, profile_url: user.profile_url,
					cards: {
						uninitiated: collection.models,
						initiated: pendingUsers,
						matched: matched
					}
				});
				// next();
			},1000);
		});
		
		// setTimeout(function(){
		// 	console.log('inside getCards uninitiated array is : ',uninitiated);
		// 	console.log('inside getCards initiated array is : ',initiated);
		// 	console.log('inside getCards matched array is : ',matched);
		// 	next();
		// },1000);

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