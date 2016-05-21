import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

export default class Profile extends Component {

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="row-height">
						<div className="col-md-4">
							<div>
								<h3 className="text-xs-center">Profile</h3>
							</div>
				      <div>
				      	<div className="text-xs-center">
				      		<img className="img-rounded center-block" src="https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png" />
				      		<h4>Firstname Lastname</h4>
				      		<h5>Email@email.com</h5>
				      	</div>
				      </div>
				    </div>
				    <div className="col-md-4">
				      <div>
				      	<h3 className="text-xs-center">Info</h3>
				      	<div>
				      		<h5>Language:</h5>
				      		<div>
				      			JavaScript
				      		</div>
				      	</div>
				      	<div>
				      		<h5>Skill Level:</h5>
				      		<div>
				      			Beginner
				      		</div>
				      	</div>
				      </div>
				    </div>
				    <div className="col-md-4">
				      <div>
				      	<h3 className="text-xs-center">Matches</h3>
				      </div>
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