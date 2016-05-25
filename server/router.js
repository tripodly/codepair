var path = require('path');

var Auth = require('./auth/authentication');
var passportService = require('./auth/passport');
var passport = require('passport');
var controler = require('./controllers/swipeController');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});

module.exports = (app) => {
	app.get('/', function(req, res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});
	app.get('*',function(req, res){
		res.redirect('/');
	})
	app.post('/user/signin', requireSignin, Auth.signin);
	app.post('/user/signup', Auth.signup);
	app.post('/user/update',function(req, res){
		console.log('request inside /updateInfo is : ',req.body);
		res.send("updateInfo POST received in server!");
	});
	app.post('/cards/no', function(req,res,next){

	})	
	app.post('/cards/yes', function(req,res,next){
		
	})	
}