import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as actions from '../actions';

class MatchAlert extends Component {
	constructor(props) {
		super(props);

		this.state = {
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
	  this.socket.on('invite',inviteObject => {
	    if(inviteObject.toID === this.props.userID){
	      this.props.waiting.forEach(waitingMatch => {
	      	if(waitingMatch.id === inviteObject.fromID){
	      		this.socket.emit('inviteResponse', { fromID: this.props.userID, toID: inviteObject.fromID });
	      		this.setState({
	      			open: true,
	      			id: waitingMatch.id,
	      			name: waitingMatch.name,
	      			language: waitingMatch.language,
	      			skillLevel: waitingMatch.skillLevel,
	      			profile_url: waitingMatch.profile_url,
	      			message: `${waitingMatch.name} wants to pair!`
	      		})
	      	}
	      });
	    }
	  });
	  this.socket.on('matchMade',matchMadeObj => {
	  	if(matchMadeObj.toID === this.props.userID){
	  	  this.props.matches.forEach(waitingMatch => {
	  	  	if(waitingMatch.id === matchMadeObj.fromID){
	  	  		this.setState({
	  	  			open: true,
	  	  			id: waitingMatch.id,
	  	  			name: waitingMatch.name,
	  	  			language: waitingMatch.language,
	  	  			skillLevel: waitingMatch.skillLevel,
	  	  			profile_url: waitingMatch.profile_url,
	  	  			message: `You matched with ${waitingMatch.name}, want to pair?`
	  	  		})
	  	  	}
	  	  });
	  	}
	  });

	  this.socket.on('rejectInvite',rejectObj => {
	  	if(rejectObj.idA === this.props.userID || rejectObj.idB === this.props.userID){
	  		this.setState({
	  			open: false,
	  			id: null,
	  			name: null,
	  			language: null,
	  			skillLevel: null,
	  			profile_url: null,
	  			message: null
	  		})
	  	}
	  })

	  this.socket.on('bothAccept',acceptObj => {
	  	if(acceptObj.idA === this.props.userID || acceptObj.idB === this.props.userID){
	  		this.props.setPartner({ id: this.state.id, name: this.state.name, language: this.state.language, skillLevel: this.state.skillLevel, profile_url: this.state.profile_url })
	  		const SESSION_ID = "" + acceptObj.idA + ":" + acceptObj.idB + "";
	  		this.props.joinSession({ sessionID: SESSION_ID });
	  		this.props.startPairing();
	  	}
	  })
	}

	handleClose(){
    this.setState({open: false});
  }

	render(){
		const actions = [
		      <FlatButton
		        label="Let's CodePair!"
		        primary={true}
		        onTouchTap={() => {
		        	this.socket.emit('acceptInvite',{fromID: this.props.userID, toID: this.state.id});
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
		return (
			<Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>{this.state.message}</Dialog>
		);
	}
}

function mapStateToProps (state) {
	if(state.profile.initiated) {
		return { current: state.cards.current, matches: state.cards.matches, waiting: state.cards.waiting, userID: state.profile.id };
	} else {
		return state;
	}
}

export default connect(mapStateToProps,actions)(MatchAlert);