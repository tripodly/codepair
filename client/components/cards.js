import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../actions';

class Cards extends Component {

	render() {
		return (
			<div> Hi! </div>
		);
	}

}

function mapStateToProps(state) {
	return { state };
}


export default connect(mapStateToProps, actions)(Cards);