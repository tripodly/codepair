var db = require('../db/config');
var User = require('../models/user');

var Users = new db.Collection();

Users.model = User;

module.exports = Users;
