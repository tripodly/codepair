var db = require('../db/config');

var Pending = db.Model.extend({
	tableName : 'pendings',
	hashTimestamps : true,
	initialize : function(){
		
	}
});

module.exports = Pending;