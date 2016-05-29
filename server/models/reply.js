var Bookshelf = require('../db/config').Bookshelf;
var Promise = require('bluebird');

var Reply = Bookshelf.Model.extend({
	tableName : 'replys',
	hashTimestamps : true,
	initialize : function(){
		console.log('reply created!');
	},
	replys : function(){
		return this.belongsTo(post,'postID');
	},
	userID : function(){
		return this.belongsTo(user,'userID');
	}
});

module.exports = Reply;