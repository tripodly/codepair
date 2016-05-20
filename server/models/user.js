const db = require('../config');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var User = db.Model.extend({
	tableName : 'user',
	hashTimestamps : true,
	initialize : function(){
		this.on('creating',function(model, attrs, options){
			bcrypt.hash(model.get('password'),null, null, function(err, hash){
				console.log('hash is :', hash);
				//store hash in db
				model.set('password',hash);
			})
		})
	}
});

module.exports = User;