var Bookshelf = require('../db/config').Bookshelf;
var Reply = require('../models/Reply');

var Replys = new Bookshelf.Collection();

Replys.model = Reply;

module.exports = Replys;
