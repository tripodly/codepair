import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions';

const style = {
	fontFamily: 'True_Lies',
	fontSize: '2.5em',
	color: '#FF0A9C',
}

class Signout extends Component {
	componentWillMount(){
		this.props.signoutUser();
	}
	
	render() {
		return (
			<div style={style}>
				Catch you on the flip side.
			</div>
		);
	}
}

export default connect(null, actions)(Signout);