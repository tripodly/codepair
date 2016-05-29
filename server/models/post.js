var Bookshelf = require('../db/config').Bookshelf;

var Post = Bookshelf.Model.extend({
	tableName : 'posts',
	hashTimestamps : true,
	initialize : function(){	
	},
	replys: function() {
    return this.hasMany(reply);
  },
  userID: function() {
    return this.belongsTo(user,'userID');
  },
});

module.exports = Post;
