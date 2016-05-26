var path = require('path');
var EnvConfig = require('../config/envConfig');
console.log('inside config : ',EnvConfig.host);
var knex = require('knex')({
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

knex.schema.hasTable('users').then(function(exists){
	if(!exists){
		knex.schema.createTable('users',function(user){
			user.increments('id').primary();
			user.string('name',255);
			user.varchar('email',255);
			user.varchar('password',255);
			user.varchar('language',255);
			user.string('skillLevel',255);
			user.varchar('github_handle',255);
			user.string('profile_url',1000).defaultTo('https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png');
			user.timestamps();
		}).then(function (table) {
      console.log('Created users Table', table);
    });
	}
});

knex.schema.hasTable('pendings').then(function(exists){
	if(!exists){
		knex.schema.createTable('pendings',function(pending){
			pending.increments('id').primary();
			pending.integer('fromUser',11).unsigned();
			pending.foreign('fromUser').references('id').inTable('users');
			pending.integer('toUser',11).unsigned();
			pending.foreign('toUser').references('id').inTable('users');
			pending.timestamps();
		}).then(function (table) {
      console.log('Created pendings Table', table);
    });
	}
});

knex.schema.hasTable('matches').then(function(exists){
	if(!exists){
		knex.schema.createTable('matches',function(match){
			match.increments('id').primary();
			match.integer('fromUser',11).unsigned();
			match.foreign('fromUser').references('id').inTable('users');
			match.integer('toUser',11).unsigned();
			match.foreign('toUser').references('id').inTable('users');
			match.timestamps();
		}).then(function (table) {
      console.log('Created matches Table', table);
    });
	}
});

knex.schema.hasTable('passes').then(function(exists){
	if(!exists){
		knex.schema.createTable('passes',function(pass){
			pass.increments('id').primary();
			pass.integer('fromUser',11).unsigned();
			pass.foreign('fromUser').references('id').inTable('users');
			pass.integer('toUser',11).unsigned();
			pass.foreign('toUser').references('id').inTable('users');
			pass.timestamps();
		}).then(function (table) {
      console.log('Created passes Table', table);
    });
	}
});


var Bookshelf = require('bookshelf')(knex);

module.exports = { 
	Bookshelf: Bookshelf,
	knex: knex
};