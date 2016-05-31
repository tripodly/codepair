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
	getCards: function(req, res, next) {
		var userObject = { 
			id: req.user.attributes.id, 
			name: req.user.attributes.name, 
			email: req.user.attributes.email, 
			language: req.user.attributes.language, 
			skillLevel: req.user.attributes.skillLevel, 
			github_handle: req.user.attributes.github_handle, 
			profile_url: req.user.attributes.profile_url 
		};

		// Query to get waiting array
		var waitingPromise = new Promise(function(resolve,reject) {
			knex('users').select('id','name','email','language','skillLevel','github_handle','profile_url').whereIn('id', 
			knex('pendings').select('toUser').where('fromUser',userObject.id))
			.then(function(response){
				resolve(response);
			});
		})

		// Query to select matches array
		var matchesPromise = new Promise(function(resolve,reject){
			knex('users').select('id','name','email','language','skillLevel','github_handle','profile_url').whereIn('id', 
			knex('matches').select('fromUser').where('toUser',userObject.id).union([
				knex('matches').select('toUser').where('fromUser',userObject.id)
			]))
			.then(function(response){
				resolve(response);
			});
		});

		// Query to select initiated array
		var initiatedPromise = new Promise(function(resolve,reject){
			knex('users').select('id','name','email','language','skillLevel','github_handle','profile_url').whereIn('id', knex('pendings').select('fromUser').where('toUser',req.user.attributes.id))
			.then(function(response){
				resolve(response);
			});
		});

		// Query to select users for uninitiated array
		var uninitiatedPromise = new Promise(function(resolve,reject){
			knex('users').select('id','name','email','language','skillLevel','github_handle','profile_url').whereNotIn('id', 
			knex('pendings').select('fromUser').where('toUser',userObject.id).union([
				knex('pendings').select('toUser').where('fromUser',userObject.id),
				knex('matches').select('fromUser').where('toUser',userObject.id),
				knex('matches').select('toUser').where('fromUser',userObject.id),
				knex('passes').select('fromUser').where('toUser',userObject.id),
				knex('passes').select('toUser').where('fromUser',userObject.id),
				knex('users').select('id').where('id',userObject.id)
			]))
			.then(function(response){
				resolve(response);
			});
		});

		Promise.all([matchesPromise, initiatedPromise, uninitiatedPromise, waitingPromise]).then(function(values){
			res.send({ id: userObject.id, name: userObject.name, email: userObject.email, language: userObject.language, skillLevel: userObject.skillLevel, github_handle: userObject.github_handle, profile_url: userObject.profile_url,
				cards: {
					waiting: values[3],
					uninitiated: values[2],
					initiated: values[1],
					matched: values[0]
				}
			});
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
	}
};
