var db = require('../db/config');
var Pending = require('../models/pending');

var Pendings = new db.Collection();

Pendings.model = Pending;

module.exports = Pendings;
