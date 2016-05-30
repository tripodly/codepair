var User = require('../models/user');
var Users = require('../collections/users');
var Post = require('../models/post');
var Posts = require('../collections/posts');
var Reply = require('../models/reply');
var Replys = require('../collections/replys');
var _ = require('lodash');
var Promise = require('bluebird');
var knex = require('../db/config').knex;

module.exports = {
	postMessage: function(req, res, next){
		console.log('this is the request in the',req.body.message);
		var messageObject = {
			userId: req.user.attributes.id,
			postMessage : req.body.message,
			subject: req.body.message
			// subject: req.body.subject
		};
		//need to make sure message doesnt exceed limit
		if(messageObject.postMessage) {
			new Post({ 'userID': req.user.attributes.id, 'message': messageObject.postMessage, subject: messageObject.subject }).save().then(function(postModel){
				// postModel is the post being saved
				res.send('post sent!');
			})
		} else {
			res.send('error making post');
		}
	},
	getPosts: function(req,res,next){
			var postPromise = new Promise(function(resolve,reject){
			knex.select('*').from('posts')
			.then(function(response){
				console.log('this is the getPosts response in the controller :',response);
				res.send(response);
				resolve(response);
			});
		});
	},
	getComments: function(req,res,next){
		var postID = req.post.postID;
		//query db for all replys with postID === to req postID
	}
};