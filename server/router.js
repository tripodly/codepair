const path = require('path');
const Bookshelf = require('bookshelf')(knex);

module.exports = (app) => {
	app.get('/', function(req, res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});
	app.post('/signin',function(req, res){})
	
}