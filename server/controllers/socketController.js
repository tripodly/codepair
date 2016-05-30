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
			people[socket.id] = user.id;
			console.log('people inside join event in socketController are : ',people);
			io.emit('online',{ onlineID: userID });
		}
		console.log('people object inside join event is : ',people);
	});

	socket.on('getOnlineUsers', function(){
		console.log('getOnlineUsers event received!');
		io.emit('broadcastOnline',{ users: people });
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
		console.log('data inside codeChange is : ',data);
		io.in(data.room).emit('updateCode',data);
	});

	socket.on('joinSession', function(data) {
		console.log('joinSession event, data is : ',data);
		socket.join(data.room);
		// io.in(data.room).emit('updateCode',"Hello World!");
	});

	socket.on('changeLanguage', function(data) {
		console.log('changeLanguage event, data is : ',data);
		io.to(data.room).emit('updateLanguage',data);
	});

	socket.on('rejectInvite', function(data) {
		console.log('reject event received, data is : ',data);
		io.emit('declineInvite',{ "idA": data.toID, "idB": data.fromID });
	})

	// These socket routes handle pairing with users the current user has already matched with:
	socket.on('partnerWithMatch', function(partnerObject){
		console.log('partnerObject is : ',partnerObject);
		var inviterID = partnerObject.inviter.id;
		var inviteeID = partnerObject.invitee.id;
		var newRoom = '' + inviteeID + ':' + inviterID + '';
		console.log('new room created, id is : ',newRoom);
		rooms.push(newRoom);
		io.emit('partnerInvite', {inviterID: inviterID, inviteeID: inviteeID});
		// io.sockets.connected[people[fromID].socket].join(newRoom);
		// io.sockets.connected[people[toID].socket].join(newRoom);
		// io.to(newRoom).emit('joinRoom',{ roomID: newRoom, toID: toID, fromID: fromID });
		// console.log(sockets[0]);
	});

	socket.on('partnerInviteeAccept', function(data) {
		console.log('partnerInviteeAccept event received, data is : ',data);
		io.emit('partnerInviteeAccepted',data);
	});

	//disconnect from the server
	socket.on('leave', function(){
		var userID = people[socket.id];
		console.log('inside disconnect socket event, userID is : ',userID);
		socket.emit('offline', { offlineID: people[userID] });
	  delete people[socket.id];
	  for(var key in people){
	  	if(people[key] === userID){
	  		delete people[key];
	  	}
	  }
	  console.log('people object is now : ',people);
	});

	socket.on('disconnect', function(){
		delete people[socket.id];
		sockets.splice(sockets.indexOf(socket), 1);
	})
})

module.exports = {
	emitMatch: function(fromUser, toUser) {
		console.log('emitMatch called in socketController!');
	}
}