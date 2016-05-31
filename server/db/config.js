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

knex.schema.hasTable('chats').then(function(exists){
	if(!exists){
		knex.schema.createTable('chats',function(chat){
			chat.increments('id').primary();
			chat.integer('fromUser',11).unsigned();
			chat.foreign('fromUser').references('id').inTable('users');
			chat.integer('toUser',11).unsigned();
			chat.foreign('toUser').references('id').inTable('users');
			chat.string('message',2000);
			chat.timestamps();
		}).then(function (table) {
      console.log('Created chats Table', table);
    });
	}
});
knex.schema.hasTable('posts').then(function(exists){
	if(!exists){
		knex.schema.createTable('posts',function(post){
			post.increments('id').primary();
			post.integer('userID',11).unsigned();
			post.foreign('userId').references('id').inTable('users');
			post.integer('vote',11).defaultTo(0);
			post.text('subject',1000);
			post.text('message',10000);
			post.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created posts Table', table);
    });
	}
});
knex.schema.hasTable('replys').then(function(exists){
	if(!exists){
		knex.schema.createTable('replys',function(reply){
			reply.increments('id').primary();
			reply.integer('userID',11).unsigned();
			reply.foreign('userID').references('id').inTable('users');
			reply.integer('postID',11).unsigned();
			reply.foreign('postID').references('id').inTable('posts');
			reply.string('comment',2000);
			reply.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
		}).then(function (table) {
      console.log('Created replys Table', table);
    });
	}
});


var Bookshelf = require('bookshelf')(knex);

module.exports = { 
	Bookshelf: Bookshelf,
	knex: knex
};