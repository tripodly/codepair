var Bookshelf = require('../db/config').Bookshelf;
var Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var Pass = Bookshelf.Model.extend({
	tableName : 'passes',
	hashTimestamps : true,
	initialize : function(){
		console.log('Pass created!');
	},
	pending : function(){
		return this.belongsTo(user,'fromUser');
	}
});

module.exports = Pass;