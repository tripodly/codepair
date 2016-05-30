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

	componentWillUnmount(){
		console.log('componentWillUnmount fired!');
		this.setState({
			inviter: null,
			open: false,
			id: null,
			name: null,
			language: null,
			skillLevel: null,
			profile_url: null,
			message: null
		});
	}

	componentDidMount() {
	  this.socket = io();
	  this.socket.on('partnerInvite',inviteObject => {
	    console.log('invite event received');
	    console.log('invite object is : ',inviteObject);
	    // do this if the current user is the instigator
	    if(inviteObject.inviterID === this.props.user.id){
	    	console.log("I've invited someone to pair...");
	    	this.props.matches.forEach(match => {
	    		if(match.id === inviteObject.inviteeID){
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
	    if(inviteObject.inviteeID === this.props.user.id){
	      console.log("I have an invite to pair!");
	      this.props.matches.forEach(match => {
	      	if(match.id === inviteObject.inviterID){
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

	  this.socket.on('partnerInviteeAccepted',data => {
	  	console.log('partnerInviteeAccepted event received, data is : ',data);
	  	// If the current user is the INVITER:
	  	if(data.inviterID === this.props.user.id && data.inviteeID === this.state.id){
	  		console.log('My invite to : ' + data.inviteeID+' was accepted!');
	  		console.log('My new partner is : ',{ id: this.state.id, name: this.state.name, language: this.state.language, skillLevel: this.state.skillLevel, profile_url: this.state.profile_url });
	  		this.props.setPartner({ id: this.state.id, name: this.state.name, language: this.state.language, skillLevel: this.state.skillLevel, profile_url: this.state.profile_url });
	  		this.setState({
	  			open: false
	  		})
	  		const SESSION_ID = "" + data.inviterID + ":" + data.inviteeID + "";
	  		this.props.joinSession({ sessionID: SESSION_ID });
	  		this.props.startPairing();
	  	}
	  	// If the current user is the INVITEE:
	  	if(data.inviteeID === this.props.user.id && data.inviterID === this.state.id){
	  		console.log('The invite from : ' + data.inviterID+' was accepted!');
	  		console.log('My new partner is : ',{ id: this.state.id, name: this.state.name, language: this.state.language, skillLevel: this.state.skillLevel, profile_url: this.state.profile_url });
	  		this.props.setPartner({ id: this.state.id, name: this.state.name, language: this.state.language, skillLevel: this.state.skillLevel, profile_url: this.state.profile_url });
	  		const SESSION_ID = "" + data.inviterID  + ":" + data.inviteeID + "";
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
		        	this.socket.emit('declineInvite',{fromID: this.props.user.id, toID: this.state.id});
		        	this.handleClose()
		        }}
		      />,
		    ];
		const receiverActions = [
		      <FlatButton
		        label="Let's CodePair!"
		        primary={true}
		        onTouchTap={() => {
		        	this.socket.emit('partnerInviteeAccept',{inviteeID: this.props.user.id, inviterID: this.state.id});
		        	this.handleClose();
		        }}
		      />,
		      <FlatButton
		        label="Maybe later"
		        primary={true}
		        onTouchTap={() => {
		        	this.socket.emit('declineInvite',{fromID: this.props.user.id, toID: this.state.id});
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