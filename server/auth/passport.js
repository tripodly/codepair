const passport = require('passport');
const User = require('../models/user');
const EnvConfig = require('../config/envConfig');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
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
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: EnvConfig.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
	// See if the user ID in the payload exists in our database
	// If it does, call 'done' with that other
	// otherwise, call 'done' without a user object
	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
