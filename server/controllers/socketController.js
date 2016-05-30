var server = require('../server').server;
var io = require('../server').io;

// console.log('in socketController : ',io);
var sockets = [];
var people = {};
var rooms = [];
var pairs = {};

io.on('connection', function(socket) {
	console.log('Client has connected to server!');
	sockets.push(socket);
	// console.log('socket connection id is : ',socket.conn.id);

	socket.on('join', function(user){
		if(user.id) {
			// people[socket.id] = { id: user.id, name: user.name };
			var userID = user.id;
			people[userID] = { socket: socket.id };
			console.log('people inside join event in socketController are : ',people);
			io.emit('online',{ onlineID: userID });
		}
		console.log(people);
	});


	socket.on('match',function(data) {
		console.log('match event received, data is : ',data);
		var matchReceiver = people[data.toID];
		console.log('matchReceiver is : ',matchReceiver);
		console.log('matchReceived socket it : ',matchReceiver.socket);
		io.emit('invite',{toID: data.toID, fromID: data.fromID, message: 'hi'});
	});

	socket.on('inviteResponse', function(data) {
		console.log('inviteResponse event received, data is : ',data);
		var responder = people[data.toID];
		console.log('responder is : ',responder);
		if(responder){
			io.emit('matchMade', { toID: data.toID, fromID: data.fromID });
		}
	})

	// acceptInvite event received, data is :  { fromID: 13, toID: 44 }
	// acceptInvite event received, data is :  { fromID: 44, toID: 13 }
	socket.on('acceptInvite', function(data) {
		console.log('acceptInvite event received, data is : ',data);
		pairs[data.fromID] = data.toID;
		// if the opposite relation exists in the pairs table,
		if(pairs[data.toID] === data.fromID) {
			// then emit to both sockets that they both accepted
			// which should trigger an action on client side to push them to codesharing page
			io.emit('bothAccept',{ "idA": data.toID, "idB": data.fromID });
			var newRoom = ""+data.toID+":"+data.fromID+""
			rooms.push(newRoom);
			socket.join(newRoom);
			console.log('socket obj is now : ',socket);
			io.in(newRoom).emit('user joined', data);
		}
	})

	socket.on('codeChange', function(data) {
		console.log('current socket is : ',socket);
		console.log('data inside codeChange is : ',data);
		io.in(data.room).emit('updateCode',data);
	});

	socket.on('joinSession', function(data) {
		console.log('joinSession event, data is : ',data);
		socket.join(data.room);
		// io.in(data.room).emit('updateCode',"Hello World!");
	});

	socket.on('rejectInvite', function(data) {
		console.log('reject event received, data is : ',data);
		io.emit('declineInvite',{ "idA": data.toID, "idB": data.fromID });
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