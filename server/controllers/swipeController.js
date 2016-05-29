
var knex = require('../db/config').knex;

module.exports = {
	dislike: function(req, res) {
		console.log('dislike in swipeController fired!');
		console.log('request body is : ',req.body);
		var fromID = req.body.fromID;
		var toID = req.body.toID;
		knex('pendings').select('*').where({ 'fromUser': toID, 'toUser': fromID }).then(function(pendingID){
			console.log('pendingID is : ',pendingID)
			if(pendingID.length === 0) {
				console.log('pending match does not exist, create a new Pass in Passes table');
				knex('passes').insert({ 'fromUser': fromID, 'toUser': toID })
					.then(function(response){
						res.send({ "match": false, "message": 'New pass created!' });
					})
			} else {
				console.log('pending match does exist, delete it and create a new Pass in Passes table');
				knex('pendings').where({ 'fromUser': toID, 'toUser': fromID }).del()
					.then(function(response){
						res.send({ "match": false, "message": 'New pass created!' });
					})
			}
		})
	},

	like: function(req, res) {
		console.log('like in swipeController fired!');
		// request body is :  { from_id: 35, to_id: 14 }
		console.log('request body is : ',req.body);
		var fromID = req.body.fromID;
		var toID = req.body.toID;
		knex('pendings').select('*').where({ 'fromUser': toID, 'toUser': fromID }).then(function(pendingID){
			console.log('pendingID is : ',pendingID)
			if(pendingID.length === 0) {
				console.log('pending match does not exist, create it...');
				knex('pendings').insert({ 'fromUser': fromID, 'toUser': toID })
					.then(function(response){
						res.send({ "match": false, "message": 'New pending match created!' });
					})
			} else {
				console.log('pending match does exist, delete it and create a new Match in Matches table');
				knex('pendings').where({ 'fromUser': toID, 'toUser': fromID }).del()
				.then(function(response){
					knex('matches').insert({ 'fromUser': fromID, 'toUser': toID })
						.then(function(response){
							console.log('new match saved with an id of : ',response);
							res.send({ "match": true, "message": 'New match created!', "pair": { fromID: fromID, toID: toID } });
						})
				})
			}
		})
	}
	
	// getMatchUp : function(req,res){
	// 	// get a user
	// 	pending.query('where', 'fromUser', '=', req.id)
	//   .fetch()
	//   .then(function(model) {
	//   	res.send(model.toUser)
	//   });
	// },
	// //call this function on new user signup
	// addToPending : function(req, res){
	// 	console.log('addToPending in swipeController called, req is : ',req);
	// 	//adds a pending maatch up from every user to this user and this user to every user
	// 		new User().fetchAll().then(function(resData){
	// 			resData.models.forEach(function(user){
	// 				new pending({fromUser:req.user.id,toUser:req.fromUser.id}).save().then(function(added){
	// 						new pending({fromUser:req.fromUser.id,toUser:req.user.id}).save();
	// 				})
	// 			})
	// 		})

	// 	res.status(200).send('new user added to pending matches');
	// },
	// denied : function(req, res){
	// 	//need to delete user from pending and add to passes collection/table
	// 	var user = req.fromUser.id;
	// 	var deniedUser = req.toUser.id;
	// 	//creates new denied relationship in the passes collection
	// 	var passedUser = new pass({fromUser:user, toUser:deniedUser});
	// 	passedUser.save().then(function(denied){
	// 		//deletes both users from pending of eachothers table so if a user denies one, the other person wont be
	// 		//matched up with them
	// 			new pending({toUser:user, fromUser: deniedUser}).fetch().then(function(fetchedModel) {
	// 			    fetchedModel.destroy(); 
	// 			}).catch(function(err){console.log('error occured in denied controller with pending model-1',err)});

	// 			new pending({toUser:deniedUser,fromUser:user}).fetch().then(function(fetchedModel) {
	// 			    fetchedModel.destroy(); 
	// 			}).catch(function(err){console.log('error occured in denied controller with pending model',err)});

	// 			res.status(200).send('Not a fit!');
	// 	})
	// },
	// accepted : function(req, res){
	// 	var user = req.fromUser.id;
	// 	var acceptedUser = req.toUser.id;
	// 	var flag = false;
	// 	//check if the user is in the persons accepted yet if not then...
	// 	var matchedUser = new match({fromUser:user, toUser:deniedUser});
	// 	//check if the user said yes to this current user if so match them together
	// 	new match({toUser:user,fromUser:acceptedUser}).fetch().then(function(fetchedModel){
	// 			    if(fetchedModel){flag = true;}
	// 			}).catch(function(err){console.log('error occured in accepted controller with match model',err)});
	// 	//delete the match off the pending table
	// 	new pending({toUser:acceptedUser, fromUser: user}).fetch()
	// 	.then(function(fetchedModel) {
	//   	fetchedModel.destroy(); 
	// 	})
	// 	.catch(function(err){console.log('error occured in accepted controller with pending model',err)});
	// 	matchedUser.save().then(function(accepted){
	// 		res.status(200).send('Looks Like a fit!');
	// 	})
	// }
}


