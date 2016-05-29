var Bookshelf = require('../db/config').Bookshelf;
var Post = require('../models/post');

var Posts = new Bookshelf.Collection();

Posts.model = Post;

module.exports = Posts;
