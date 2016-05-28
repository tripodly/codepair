var Bookshelf = require('../db/config').Bookshelf;
var Match = require('../models/chat');

var Chats = new Bookshelf.Collection();

Chats.model = Match;

module.exports = Chats;
