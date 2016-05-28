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
					res.send('message sent!');
				})
			} else{
				res.send('error sending message to :')
			}
	}
	
};
