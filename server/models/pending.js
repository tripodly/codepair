var Bookshelf = require('../db/config').Bookshelf;

var Pending = Bookshelf.Model.extend({
	tableName : 'pendings',
	hashTimestamps : true,
	initialize : function(){	
	},
	pending : function(){
		return this.belongsTo(user,'fromUser');
	}
});

module.exports = Pending;