const path = require('path');
const EnvConfig = require('../config/envConfig');
const db = require('knex')({
	client: 'mysql',
	connection: {
		host			: EnvConfig.host,
		user			: EnvConfig.user,
		password  : EnvConfig.password,
		database 	: EnvConfig.database,
		charset		: 'utf8',
		filename  : path.join(__dirname,'../db/codepair.sql')
	}
});

db.schema.hasTable('users').then(function(exists){
	if(!exists){
		db.chema.createTable('users',function(user){
			user.inciments('id').primary();
			user.string('name',255);
			user.varchar('email',255);
			user.varchar('password',255);
			user.varchar('language',255);
			user.string('skill',255);
		}).then(function (table) {
      console.log('Created users Table', table);
    });
	}
});

var Bookshelf = require('bookshelf')(db);
module.exports = Bookshelf;