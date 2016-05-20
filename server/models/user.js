const db = require('../config');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

// use bcrypt to encrypt user password to store in db
var User = db.Model.extend({

});

module.exports = User;