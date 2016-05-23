const path = require('path');

const Auth = require('./auth/authentication');
const passportService = require('./auth/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

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