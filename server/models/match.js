var Bookshelf = require('../db/config').Bookshelf;
var Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var Match = Bookshelf.Model.extend({
	tableName : 'matches',
	hashTimestamps : true,
	initialize : function(){
		console.log('Match created!');
	},
	pending : function(){
		return this.belongsTo(user,'fromUser');
	}
});

module.exports = Match;