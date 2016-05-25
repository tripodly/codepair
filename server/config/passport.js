var passport = require('passport');
var User = require('../models/user');
var EnvConfig = require('./envConfig');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var LocalStrategy = require('passport-local');


// Create local strategy
var localOptions = { usernameField: 'email' };
var localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	console.log('localLogin strategy used');
	// Verify this username and password, call done with the user
	// if it is the correct email and password
	// otherwise, call done with false
	console.log('email passed in is : ',email);
	new User({ email: email }).fetch().then(function(user,error) {
		if (error) { 
			console.log('error in localLogin, err is : ',err);
			return done(err); 
		}
		if (!user) { 
			console.log('user does not exist');
			return done(null, false); 
		}

		// compare passwords - is 'password' equal to user.password?
		user.comparePassword(password, function(err, isMatch) {
			if (err) { 
				console.log('err inside localLogin comparePassword');
				return done(err); 
			}
			if (!isMatch) { 
				console.log('localLogin, comparePassword not a match!');
				return done(null, false); 
			}
			console.log('inside localLogin comparePassword user info is : ', user);
			return done(null, user);
		});
	});
});

// Setup options for JWT Strategy
var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: EnvConfig.secret
};

// Create JWT strategy
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	console.log('inside jwtLogin in passport.js');
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that other
	// otherwise, call 'done' without a user object
	new User({ id: payload.sub }).fetch().then( function(user, error) {
		console.log('inside jwtLogin');
		console.log('error is : ',error);
		console.log('user is : ',user);
		// If there is an error in fetching the user
		if (error) { 
			// Return the error in done
			return done(err, false); 
		}

		// If the user exists
		if (user) {
			// Return the user object in done
			done(null, user);
		} else {
			// Otherwise return false in done
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
