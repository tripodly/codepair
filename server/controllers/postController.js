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
		var messageObject = {
			userId: req.message.id,
			postMessage : req.message.message
		};
		//need to make sure message doesnt exceed limit
		if(req.message.message && req.message.id) {
			new Post({ 'userId': req.message.id, 'message': req.message.message }).save().then(function(postModel){
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