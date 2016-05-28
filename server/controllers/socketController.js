var server = require('../server').server;
var io = require('../server').io;

// console.log('in socketController : ',io);
var sockets = [];
var people = {};
var rooms = [];

io.on('connection', function(socket) {
	console.log('Client has connected to server!');
	sockets.push(socket);
	// console.log('socket connection id is : ',socket.conn.id);

	socket.on('join', function(user){
		if(user.id) {
			people[socket.id] = { id: user.id, name: user.name };
		}
		console.log(people);
	});

	socket.on('partner', function(partnerObject){
		console.log('partnerObject is : ',partnerObject);
		var roomName = ''+partnerObject.fromUser.id+":"+partnerObject.toUser.id+'';
		console.log('new room created, id is : ',roomName);
		rooms.push(roomName);
	})

	//disconnect from the server
	socket.on('disconnect', function(){
	  delete people[socket.id];
	  sockets.splice(sockets.indexOf(socket), 1);
	});
})

module.exports = {
	emitMatch: function(fromUser, toUser) {
		console.log('emitMatch called in socketController!');
	}
}