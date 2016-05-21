import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default class Profile extends Component {

	render() {
		return (
			<div className="container">
				<div className="row">
					<div class="col-sm-4">
			      <div className="media">
			      	<img className="media-object" src="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png
" />
			      </div>
			    </div>
			    <div class="col-sm-4">
			      <div>
			      	Info
			      </div>
			    </div>
			    <div class="col-sm-4">
			      <div>
			      	Matches
			      </div>
			    </div>
				</div>
			</div>
		);
	}
}

// function mapStateToProps(state){
// 	return { message: state.auth.message };
// }

// export default connect(null)(Profile);