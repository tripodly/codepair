var Bookshelf = require('../db/config').Bookshelf;
var Pending = require('../models/pending');

var Pendings = new Bookshelf.Collection();

Pendings.model = Pending;

module.exports = Pendings;
