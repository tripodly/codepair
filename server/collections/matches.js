var db = require('../db/config');
var Match = require('../models/match');

var Matches = new db.Collection();

Matches.model = Match;

module.exports = Matches;
