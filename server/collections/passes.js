var db = require('../db/config');
var Pass = require('../models/pass');

var Passes = new db.Collection();

Passes.model = Pass;

module.exports = Passes;
