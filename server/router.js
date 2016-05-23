var path = require('path');

var Auth = require('./auth/authentication');
var passportService = require('./auth/passport');
var passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = (app) => {
	app.get('/', function(req, res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});
	app.post('/signin', requireSignin, Auth.signin);
	app.post('/signup', Auth.signup);
	app.post('/updateInfo',function(req, res){
		console.log('request inside /updateInfo is : ',req.body);
		res.send("updateInfo POST received in server!");
	});
	
}