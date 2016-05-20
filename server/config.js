const path = require('path');
const db = require('knex')({
	client: 'mysql',
	connection: {
		host			: '127.0.0.1',
		user			: 'tripodly',
		password  : 'acj123',
		database 	: 'codepair',
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
		})
	}
})