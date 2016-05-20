const db = require('../config');
const User = require('../models/user');

const Users = new db.Collection();

Users.model = User;

module.exports = Users;
