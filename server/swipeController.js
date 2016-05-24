var User = require('../models/user');
var Users = require('../collections/users');

var pending = require('../models/pending');
var Pendings = require('../collections/pendings');

var match = require('../models/match');
var matches = require('../collections/matches');

var pass = require('../models/pass');
var passes = require('../collections/pases');

module.exports = {
	
//call this function on new user signup
	addTopending : function(req, res){
		var user = req.fromUser;
		pendingUser = new pending({toUser:user});
		pendingUser.save().then(function(added){
			pendings.add(added);
		})
	},

	denied : function(req, res){
		var user = req.fromUser.id;
		var deniedUser = req.toUser.id;
		var passedUser = new pass({fromUser:user, toUser:deniedUser});

		passedUser.save().then(function(denied){
			passes.add(denied);
			res.status(200).send('Not a fit!');
		})
	},
		accepted : function(req, res){
		var user = req.fromUser.id;
		var acceptedUser = req.toUser.id;
		var matchedUser = new match({fromUser:user, toUser:deniedUser});

		matchedUser.save().then(function(accepted){
			matches.add(accepted);
			res.status(200).send('Looks Like a fit!');
		})
	}

}