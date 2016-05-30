import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
// import forEach from 'lodash/forEach';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';

class MatchInvite extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inviter: null,
			open: false,
			id: null,
			name: null,
			language: null,
			skillLevel: null,
			profile_url: null,
			message: null
		}
	}

	componentDidMount() {
	  this.socket = io();
	  this.socket.on('partnerInvite',inviteObject => {
	    console.log('invite event received');
	    console.log('invite object is : ',inviteObject);
	    // do this if the current user is the instigator
	    if(inviteObject.fromID === this.props.user.id){
	    	console.log("I've invited someone to pair...");
	    	this.props.matches.forEach(match => {
	    		if(match.id === inviteObject.toID){
	    			this.setState({
	    				inviter: true,
	    				open: true,
	    				id: match.id,
	    				name: match.name,
	    				language: match.language,
	    				skillLevel: match.skillLevel,
	    				profile_url: match.profile_url,
	    				message: `Waiting to see if ${match.name} wants to pair...`
	    			})
	    		}
	    	});
	    }
	    // do this if the current user is the receiver
	    if(inviteObject.toID === this.props.user.id){
	      console.log("I have an invite to pair!");
	      this.props.matches.forEach(match => {
	      	if(match.id === inviteObject.fromID){
	      		this.setState({
	      			open: true,
	      			id: match.id,
	      			name: match.name,
	      			language: match.language,
	      			skillLevel: match.skillLevel,
	      			profile_url: match.profile_url,
	      			message: `${match.name} wants to pair!`
	      		})
	      	}
	      });
	    }
	  });

	  // this.socket.on('matchMade',matchMadeObj => {
	  // 	console.log('matchMade event received');
	  // 	console.log('matchMade object is : ',matchMadeObj);
	  // 	console.log('this.props.userID is : ',this.props.userID);
	  // 	if(matchMadeObj.toID === this.props.userID){
	  // 	  console.log("I HAVE A NEW MATCH!");
	  // 	  this.props.matches.forEach(waitingMatch => {
	  // 	  	if(waitingMatch.id === matchMadeObj.fromID){
	  // 	  		console.log('waitingmatchid found to match matchmadeobj.fromid')
	  // 	  		this.setState({
	  // 	  			open: true,
	  // 	  			id: waitingMatch.id,
	  // 	  			name: waitingMatch.name,
	  // 	  			language: waitingMatch.language,
	  // 	  			skillLevel: waitingMatch.skillLevel,
	  // 	  			profile_url: waitingMatch.profile_url,
	  // 	  			message: `You matched with ${waitingMatch.name}, want to pair?`
	  // 	  		})
	  // 	  	}
	  // 	  });
	  // 	}
	  // });

	  // this.socket.on('rejectInvite',rejectObj => {
	  // 	console.log('rejectInvite event received, rejectObj is : ',rejectObj);
	  // 	if(rejectObj.idA === this.props.userID || rejectObj.idB === this.props.userID){
	  // 		console.log('INVITE HAS BEEN REJECTED!');
	  // 		this.setState({
	  // 			inviter: null,
	  // 			open: false,
	  // 			id: null,
	  // 			name: null,
	  // 			language: null,
	  // 			skillLevel: null,
	  // 			profile_url: null,
	  // 			message: null
	  // 		})
	  // 	}
	  // })

	  this.socket.on('partnerAccepted',data => {
	  	console.log('partnerAccepted event received, data is : ',data);
	  	if(data.fromID === this.props.userID && data.toID === this.state.id || data.toID === this.props.userID && data.fromID === this.state.id){
	  		console.log('USER SHOULD NOW JOIN CODEPAIR SESSION!');
	  		this.props.setPartner({ id: this.state.id, name: this.state.name, language: this.state.language, skillLevel: this.state.skillLevel, profile_url: this.state.profile_url })
	  		const SESSION_ID = "" + data.idA + ":" + data.idB + "";
	  		this.props.joinSession({ sessionID: SESSION_ID });
	  		this.props.startPairing();
	  	}
	  })
	}

	handleClose(){
    this.setState({open: false});
  }

	render(){
		const inviterActions = [
		      <FlatButton
		        label="Cancel invite?"
		        primary={true}
		        onTouchTap={() => {
		        	this.socket.emit('declineInvite',{fromID: this.props.userID, toID: this.state.id});
		        	this.handleClose()
		        }}
		      />,
		    ];
		const receiverActions = [
		      <FlatButton
		        label="Let's CodePair!"
		        primary={true}
		        onTouchTap={() => {
		        	this.socket.emit('partnerAccept',{fromID: this.props.userID, toID: this.state.id});
		        	this.handleClose();
		        }}
		      />,
		      <FlatButton
		        label="Maybe later"
		        primary={true}
		        onTouchTap={() => {
		        	this.socket.emit('declineInvite',{fromID: this.props.userID, toID: this.state.id});
		        	this.handleClose()
		        }}
		      />,
		    ];
		if(this.state.inviter){
			return (
				<Dialog actions={inviterActions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>{this.state.message}</Dialog>
			);
		} else {
			return (
				<Dialog actions={receiverActions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>{this.state.message}</Dialog>
			);
		}
		
	}
}

function mapStateToProps (state) {
	return { user: state.profile, matches: state.cards.matches };
}

export default connect(mapStateToProps,actions)(MatchInvite);