var User = require('../models/user');
var Users = require('../collections/users');
var _ = require('lodash');
var Promise = require('bluebird');
var knex = require('../db/config').knex;

module.exports = {

	sendMessage(req, res){
		var userObj = { 
			id: req.user.attributes.id, 
			name: req.user.attributes.name, 
			email: req.user.attributes.email, 
			language: req.user.attributes.language, 
			skillLevel: req.user.attributes.skillLevel, 
			github_handle: req.user.attributes.github_handle, 
			profile_url: req.user.attributes.profile_url 
		};
		var newMessage = new Promise(function(resolve, reject){
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
				console.log('inside update chatcontroller knex statement');
				console.log('response from chatController query is : ',response);
				resolve(response);
			});
		});

		updateProfile.then(function(response){
			console.log('inside promise resolved, userObj is : ',userObj);
			res.send(userObj)
		});
	}
	
};
