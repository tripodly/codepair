var Bookshelf = require('../db/config').Bookshelf;
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var User = Bookshelf.Model.extend({
	tableName : 'users',
	hashTimestamps : true,
	initialize : function(){
		this.on('creating', this.hashPassword, this);
	},
	hashPassword: function(model, attrs, options) {
		var cipher = Promise.promisify(bcrypt.hash);
		return cipher(model.attributes.password, null, null)
	    .then(function(hash) {
	      model.set('password', hash);
	    });
	},
	comparePassword: function(candidatePassword, callback) {
		var cipher = Promise.promisify(bcrypt.compare);
		return cipher(candidatePassword, this.get('password'), function(err, isMatch) {
			if (err) { return callback(err); }
			console.log('isMatch inside comparePassword ? ',isMatch);
			callback(null, isMatch);
		});
	},
	passes: function() {
    return this.hasMany(pass);
  },
  pendings: function() {
    return this.hasMany(pending);
  },
  matches: function() {
    return this.hasMany(match);
  },
  chats : function(){
  	return this.hasMany(chat);
  }
});

module.exports = User;