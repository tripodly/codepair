var db = require('../db/config');

var Pending = db.Model.extend({
	tableName : 'pendings',
	hashTimestamps : true,
	initialize : function(){	
	},
	pending : function(){
		return this.belongsTo(user,'fromUser');
	}
});

module.exports = Pending;