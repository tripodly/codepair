const db = require('../config');
const Match = require('../models/match');

const Matches = new db.Collection();

Matches.model = Match;

module.exports = Matches;
