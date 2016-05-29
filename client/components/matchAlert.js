import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import * as actions from '../actions';

class MatchAlert extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: 
		}
	}
	render(){
		return (
			<Dialog actions={actions} modal={false} open={}
		)
	}
}

function mapStateToProps(state){
	return { openAlert:  }
}