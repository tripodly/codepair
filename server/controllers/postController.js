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
			subject: req.body.subject
			// subject: req.body.subject
		};
		//need to make sure message doesnt exceed limit
		if(messageObject.postMessage) {

			new Post({ 'userID': req.user.attributes.id,'name':req.user.attributes.name, 'profile_url':req.user.attributes.profile_url, 'message': messageObject.postMessage, subject: messageObject.subject }).save().then(function(postModel){
				// postModel is the post being saved
				res.send('post sent!',postModel);
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
		var postID = req.body.id;
		//query db for all replys with postID === to req id
		var postObject = {post:'', comments:''}
		console.log('the req body in getComments post method is :',req.body.id)
			var postPromise = new Promise(function(resolve,reject){
			knex.select('*').from('replys').where('postID',postID)
			.then(function(response){
				postObject.comments = response;
				knex.select('*').from('posts').where('id',postID)
				.then(function(resp){
					postObject.post = resp;
					res.send(postObject);
					resolve(response);
				})
				console.log('this is the getComments response in the controller :',response);
			});
		});
	},
	postComment: function(req, res, next){
		console.log('this is in the post commentController');
		var messageObject = {
			userId: req.user.attributes.id,
			postComment : req.body.comment,
			postID: req.body.id
		};
		if(messageObject.postComment.length >= 2 && messageObject.postID){
		new Reply({ 'userID': req.user.attributes.id, 'name':req.user.attributes.name, 'profile_url':req.user.attributes.profile_url,'comment': messageObject.postComment, postID: messageObject.postID }).save().then(function(postComment){
				res.send({ message: 'post sent!', post: postComment });
			})
		} else {
			res.send('error making a comment!');
		}
	}

};