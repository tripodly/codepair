var Bookshelf = require('../db/config').Bookshelf;
var User = require('../models/user');

var Users = new Bookshelf.Collection();

Users.model = User;

module.exports = Users;
