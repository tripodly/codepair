var Bookshelf = require('../db/config').Bookshelf;
var Chat = require('../models/chat');

var Chats = new Bookshelf.Collection();

Chats.model = Chat;

module.exports = Chats;
