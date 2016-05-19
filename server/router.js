const path = require('path');

module.exports = (app) => {
	app.get('/', function(req,res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});
	
}