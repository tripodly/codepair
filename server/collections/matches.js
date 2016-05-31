var Bookshelf = require('../db/config').Bookshelf;
var Match = require('../models/match');

var Matches = new Bookshelf.Collection();

Matches.model = Match;

module.exports = Matches;
