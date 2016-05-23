const db = require('../config');

var Match = db.Model.extend({
	tableName : 'matches',
	hashTimestamps : true,
	initialize : function(){
		
	}
});

module.exports = Match;