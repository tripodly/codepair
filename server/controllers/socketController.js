var server = require('../server').server;
var io = require('../server').io;

var sockets = [];
var people = {};
var rooms = [];
var pairs = {};

io.on('connection', function(socket) {
	console.log('Client has connected to server!');
	sockets.push(socket);

	socket.on('join', function(user){
		if(user.id) {
			var userID = user.id;
			people[userID] = { socket: socket.id };
			people[socket.id] = user.id;
			io.emit('online',{ onlineID: userID });
		}
	});

	socket.on('getOnlineUsers', function(){
		io.emit('broadcastOnline',{ users: people });
	});

	socket.on('match',function(data) {
		var matchReceiver = people[data.toID];
		io.emit('invite',{toID: data.toID, fromID: data.fromID, message: 'hi'});
	});

	socket.on('inviteResponse', function(data) {
		var responder = people[data.toID];
		if(responder){
			io.emit('matchMade', { toID: data.toID, fromID: data.fromID });
		}
	})

	socket.on('acceptInvite', function(data) {
		pairs[data.fromID] = data.toID;
		// if the opposite relation exists in the pairs table,
		if(pairs[data.toID] === data.fromID) {
			// then emit to both sockets that they both accepted
			// which should trigger an action on client side to push them to codesharing page
			io.emit('bothAccept',{ "idA": data.toID, "idB": data.fromID });
			var newRoom = ""+data.toID+":"+data.fromID+""
			rooms.push(newRoom);
			socket.join(newRoom);
			io.in(newRoom).emit('user joined', data);
		}
	})

	socket.on('codeChange', function(data) {
		io.in(data.room).emit('updateCode',data);
	});

	socket.on('joinSession', function(data) {
		socket.join(data.room);
	});

	socket.on('changeLanguage', function(data) {
		io.to(data.room).emit('updateLanguage',data);
	});

	socket.on('rejectInvite', function(data) {
		io.emit('declineInvite',{ "idA": data.toID, "idB": data.fromID });
	})

	// These socket routes handle pairing with users the current user has already matched with:
	socket.on('partnerWithMatch', function(partnerObject){
		var inviterID = partnerObject.inviter.id;
		var inviteeID = partnerObject.invitee.id;
		var newRoom = '' + inviteeID + ':' + inviterID + '';
		rooms.push(newRoom);
		io.emit('partnerInvite', {inviterID: inviterID, inviteeID: inviteeID});
	});

	socket.on('partnerInviteeAccept', function(data) {
		io.emit('partnerInviteeAccepted',data);
	});

	//disconnect from the server
	socket.on('leave', function(){
		var userID = people[socket.id];
		socket.emit('offline', { offlineID: people[userID] });
	  delete people[socket.id];
	  for(var key in people){
	  	if(people[key] === userID){
	  		delete people[key];
	  	}
	  }
	});

	socket.on('disconnect', function(){
		delete people[socket.id];
		sockets.splice(sockets.indexOf(socket), 1);
	});
});