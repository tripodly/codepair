var server = require('../server').server;
var io = require('../server').io;

// console.log('in socketController : ',io);

io.on('connection', function(socket) {
	console.log('Client has connected to server!');
})

module.exports = {
	emitMatch: function(fromUser, toUser) {
		console.log('emitMatch called in socketController!');
	}
}