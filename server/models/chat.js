var Bookshelf = require('../db/config').Bookshelf;
var Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var Chat = Bookshelf.Model.extend({
	tableName : 'chats',
	hashTimestamps : true,
	initialize : function(){
		console.log('Chat created!');
	},
	chat : function(){
		return this.belongsTo(user,'fromUser');
	}
});

module.exports = Chat;