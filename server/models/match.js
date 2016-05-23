var db = require('../db/config');
var Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var Match = db.Model.extend({
	tableName : 'matches',
	hashTimestamps : true,
	initialize : function(){
		console.log('Match created!');
	}
});

module.exports = Match;