var Bookshelf = require('../db/config').Bookshelf;
var Pass = require('../models/pass');

var Passes = new Bookshelf.Collection();

Passes.model = Pass;

module.exports = Passes;
