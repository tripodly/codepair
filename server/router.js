var path = require('path');
var Auth = require('./controllers/authController');
var passportService = require('./config/passport');
var passport = require('passport');
var userController = require('./controllers/userController');
var cardsController = require('./controllers/cardsController');
var swipeController = require('./controllers/swipeController');
var chatController = require('./controllers/chatController');
var requireAuth = passport.authenticate('jwt', {session: false});
var requireSignin = passport.authenticate('local', {session: false});
var postController = require('./controllers/postController')

module.exports = function(app){
	// route to get index route
	app.get('/', function(req, res, next){
		res.sendFile(path.join(__dirname, '../client/index.html'));
	});

	// route when user signs in
	app.post('/user/signin', requireSignin, Auth.signin);

	// route when new user signs up
	app.post('/user/signup', Auth.signup);

	// route when user gets to their profile page
	app.get('/user/profile', requireAuth, function(req,res,next){
		var userObject = { 
			id: req.user.attributes.id, 
			name: req.user.attributes.name, 
			email: req.user.attributes.email, 
			language: req.user.attributes.language, 
			skillLevel: req.user.attributes.skillLevel, 
			github_handle: req.user.attributes.github_handle, 
			profile_url: req.user.attributes.profile_url 
		};
		res.send(userObject);
	});

	// route when user requests their cards
	app.get('/user/cards', requireAuth, cardsController.getCards);

	// route when user updates their information
	app.post('/user/edit', requireAuth, userController.editProfileInfo);

	// route when user sends message to another user
	app.post('/user/send', requireAuth, chatController.sendMessage);

	// route when user requests their messages they had with other user
	app.get('/user/message', requireAuth, chatController.getMessages);
	
	// route if user swipes left on a card
	app.post('/cards/dislike', requireAuth, swipeController.dislike);

	// route if user swipes right on a card
	app.post('/cards/like', requireAuth, swipeController.like);

	// route if user getspost for the forum
	app.post('/user/postMessage', requireAuth, postController.postMessage);

	// route if user posts a new post to the forum
	app.get('/user/getPosts', requireAuth, postController.getPosts);

	// catch all route which redirects to index
	app.get('*',function(req, res){
		// TODO: change to send back index.html
		// res.sendFile(path.join(__dirname, '../client/index.html'));
		res.redirect('/');
	});

}