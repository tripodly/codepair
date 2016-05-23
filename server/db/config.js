var path = require('path');
var EnvConfig = require('./config/envConfig');
console.log('inside config : ',EnvConfig.host);
var db = require('knex')({
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
		db.schema.createTable('users',function(user){
			user.increments('id').primary();
			user.string('name',255);
			user.varchar('email',255);
			user.varchar('password',255);
			user.varchar('language',255);
			user.string('skillLevel',255);
			user.string('profile_url',1000).defaultTo('https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png');
			user.timestamps();
		}).then(function (table) {
      console.log('Created users Table', table);
    });
	}
});

db.schema.hasTable('pendings').then(function(exists){
	if(!exists){
		db.schema.createTable('pendings',function(pending){
			pending.increments('id').primary();
			pending.integer('fromUser',11).unsigned().inTable('users').references('id');
			pending.integer('toUser',11).unsigned().inTable('users').references('id');
			pending.timestamps();
		}).then(function (table) {
      console.log('Created pendings Table', table);
    });
	}
});

db.schema.hasTable('matches').then(function(exists){
	if(!exists){
		db.schema.createTable('matches',function(match){
			match.increments('id').primary();
			match.integer('fromUser',11).unsigned().inTable('users').references('id');
			match.integer('toUser',11).unsigned().inTable('users').references('id');
			match.timestamps();
		}).then(function (table) {
      console.log('Created matches Table', table);
    });
	}
});

db.schema.hasTable('passes').then(function(exists){
	if(!exists){
		db.schema.createTable('passes',function(pass){
			pass.increments('id').primary();
			pass.integer('fromUser',11).unsigned().inTable('users').references('id');
			pass.integer('toUser',11).unsigned().inTable('users').references('id');
			pass.timestamps();
		}).then(function (table) {
      console.log('Created passes Table', table);
    });
	}
});

var Bookshelf = require('bookshelf')(db);
module.exports = Bookshelf;