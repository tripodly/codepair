import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
// import forEach from 'lodash/forEach';
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
			profile_url: null
		}
	}

	componentDidMount() {
	  this.socket = io();
	  this.socket.on('invite',invite => {
	    console.log('invite event received');
	    console.log('invite object is : ',invite);
	    if(invite.toID === this.props.userID){
	      console.log("I HAVE A NEW MATCH!");
	      this.props.waiting.forEach(waitingMatch => {
	      	if(waitingMatch.id === invite.fromID){
	      		this.setState({
	      			open: true,
	      			id: waitingMatch.id,
	      			name: waitingMatch.name,
	      			language: waitingMatch.language,
	      			skillLevel: waitingMatch.skillLevel,
	      			profile_url: waitingMatch.profile_url
	      		})
	      	}
	      });
	    }
	  });
	}

	handleClose(){
    this.setState({open: false});
  }

	render(){
		const actions = [
		      <FlatButton
		        label="Let's CodePair!"
		        primary={true}
		        onTouchTap={() => this.handleClose()}
		      />,
		      <FlatButton
		        label="Maybe later"
		        primary={true}
		        onTouchTap={() => this.handleClose()}
		      />,
		    ];
		return (
			<Dialog actions={actions} modal={false} open={this.state.open} onRequestClose={this.handleClose}>{this.state.name} want's to pair</Dialog>
		);
	}
}

function mapStateToProps (state) {
	if(state.cards.waiting.length > 0) {
		return { current: state.cards.current, cardID: state.cards.current.id, waiting: state.cards.waiting, userID: state.profile.id };
	} else {
		return state;
	}
}

export default connect(mapStateToProps,actions)(MatchAlert);