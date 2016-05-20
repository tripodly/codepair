const path = require('path');
const db = require('./config');
const Users = require('./collections/users');
const User = require('./models/user');

module.exports = (app) => {
	app.get('/', function(req, res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});
	app.post('/signin',function(req, res){})
	
}