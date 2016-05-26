var path = require('path');

var Auth = require('./controllers/authController');
var passportService = require('./config/passport');
var passport = require('passport');

var userController = require('./controllers/userController');
var swipeController = require('./controllers/swipeController');

var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});


module.exports = (app) => {
	// route to get index route
	app.get('/', function(req, res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});

	app.get('/user/profile', requireAuth, function(req,res,next){
		console.log('inside get request for user profile');
		var user = req.user.attributes;
		var userObject = { 
			id: user.id, 
			name: user.name, 
			email: user.email, 
			language: user.language, 
			skillLevel: user.skillLevel, 
			github_handle: user.github_handle, 
			profile_url: user.profile_url 
		};
		res.send(userObject);
	});

	app.get('/user/cards', requireAuth, userController.getCards, function(req,res,next){
		// console.log('inside get request for user cards, request object is : ',req);
		console.log('inside get request for user cards, response object is : ',res);
		var user = req.user.attributes;
		res.send({ id: user.id, name: user.name, email: user.email, language: user.language, skillLevel: user.skillLevel, github_handle: user.github_handle, profile_url: user.profile_url,

		});
	});
	
	app.get('/user/edit', requireAuth, userController.editProfileInfo , function(req,res,next){
		// console.log('inside get request for user cards, request object is : ',req);
		console.log('inside get request for edit users profile, response object is : ',res);
		var user = req.user.attributes;
		res.send({ id: user.id, name: user.name, email: user.email, language: user.language, skillLevel: user.skillLevel, github_handle: user.github_handle, profile_url: user.profile_url,

		});
	});

	// catch all route which redirects to index
	app.get('*',function(req, res){
		// TODO: change to send back index.html
		// res.sendFile(path.join(__dirname, '../client/index.html'));
		res.redirect('/');
	});

	// route when user signs in
	app.post('/user/signin', requireSignin, Auth.signin);

	// route when new user signs up
	app.post('/user/signup', Auth.signup);

	// route when user updates their information
	app.post('/user/update',function(req, res){
		console.log('request inside /updateInfo is : ',req.body);
		res.send("updateInfo POST received in server!");
	});

	// route if user swipes left on a card
	app.post('/cards/dislike', requireAuth, swipeController.dislike);

	// route if user swipes right on a card
	app.post('/cards/like', requireAuth, swipeController.like);
}