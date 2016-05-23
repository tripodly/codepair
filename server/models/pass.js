var db = require('../db/config');
var Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var Pass = db.Model.extend({
	tableName : 'passes',
	hashTimestamps : true,
	initialize : function(){
		console.log('Pass created!');
	}
});

module.exports = Pass;