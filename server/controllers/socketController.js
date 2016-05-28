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
			// people[socket.id] = { id: user.id, name: user.name };
			var userID = user.id;
			people[userID] = { socket: socket.id };
		}
		console.log(people);
	});

	socket.on('codeChange', function(data) {
		console.log('data inside codeChange is : ',data);
		io.emit('updateCode',data);
	})

	socket.on('partner', function(partnerObject){
		console.log('partnerObject is : ',partnerObject);
		var roomName = '' + partnerObject.fromUser.id + ':' + partnerObject.toUser.id + '';
		console.log('new room created, id is : ',roomName);
		rooms.push(roomName);
		var fromID = partnerObject.fromUser.id;
		var toID = partnerObject.toUser.id;
		io.sockets.connected[people[fromID].socket].join(roomName);
		io.sockets.connected[people[toID].socket].join(roomName);
		io.to(roomName).emit('joinRoom',{ roomID: roomName, toID: toID, fromID: fromID });
		console.log(sockets[0]);
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