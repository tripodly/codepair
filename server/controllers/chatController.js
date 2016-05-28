var User = require('../models/user');
var Users = require('../collections/users');
var Chat = require('../models/chat');
var Chats = require('../collections/chats');
var _ = require('lodash');
var Promise = require('bluebird');
var knex = require('../db/config').knex;

module.exports = {
	sendMessage(req, res){
		// request body is :  { from_id: 35, to_id: 14, message:'hello!' }
		var message = req.message;
		var fromUser = req.fromUser;
		var toUser = req.toUser;
			if(message) {
				new Match({ 'fromUser': fromUser, 'toUser': toUser }).save().then(function(chatModel){
					// chatModel is the message being saved
					res.send('message sent!');
				})
			} else{
				res.send('error sending message to :')
			}
	},
	getMessages(req, res){
		var fromUser = req.fromUser;
		var toUser = req.toUser;
		var messages = [];
		var chatPromise = new Promise(function(resolve,reject){
			knex('chats').select('*').where('fromUser',fromUser).andWhere('toUser',toUser)
			.then(function(response){
				console.log('this is the getMessages response :'response);
				res.send(response)
				resolve(response);
			});
		});
	}
};
