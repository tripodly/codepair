import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import * as actions from '../actions';
import { Link } from 'react-router';

const style = {
	profilePic: {
		width: 200,
		height: 200,
	},
}

class Profile extends Component {
	handleFormSubmit(formProps) {
		this.props.updateUserInfo(formProps);
	}

	componentWillMount() {
		console.log('inside componentWillRender in Profile');
		this.props.getUserInfo();
	}

	render() {
		const { handleSubmit, fields: { email, name, language, skillLevel }} = this.props;

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
				      		<img style={style.profilePic} className="img-rounded center-block" src={this.props.profilePicture} />
				      		<h4>{this.props.profileName}</h4>
				      		<h5>{this.props.profileEmail}</h5>
				      	</div>
				      </div>
				    </div>
				    <div className="col-md-4">
				      <div>
				      	<h3 className="text-xs-center">Edit info:</h3>
				      	<div>
				      		<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				      			<fieldset className="form-group">
				      				<label>Email:</label>
				      				<input {...email} className="form-control"/>
				      				{email.touched && email.error && <div className="error">{email.error}</div>}
				      			</fieldset>
				      			<fieldset className="form-group">
				      				<label>Name:</label>
				      				<input {...name} className="form-control"/>
				      				{name.touched && name.error && <div className="error">{name.error}</div>}
				      			</fieldset>
				      			<fieldset className="form-group">
				      				<label>Language:</label>
				      				<input {...language} className="form-control"/>
				      				{language.touched && language.error && <div className="error">{language.error}</div>}
				      			</fieldset>
				      			<fieldset className="form-group">
				      				<label>Skill level:</label>
				      				<input {...skillLevel} className="form-control"/>
				      				{skillLevel.touched && skillLevel.error && <div className="error">{skillLevel.error}</div>}
				      			</fieldset>
				      			<button action="submit" className="btn btn-primary">Confirm</button>
				      		</form>
				      	</div>
				      </div>
				    </div>
				    <div className="col-md-4">
				      <div>
				      	<h3 className="text-xs-center">Matches</h3>
				      	<Link to="/cards"><button>Match me!</button></Link>
				      </div>
				    </div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { profileEmail: state.profile.email, profileName: state.profile.name, profileLanguage: state.profile.language, profileSkillLevel: state.profile.skillLevel, profileGithub: state.profile.github_handle, profilePicture: state.profile.profile_url };
}

function validate(formProps) {
	const errors = {};

	if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formProps.email)){
		errors.email = 'Please enter a valid email address';
	}

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}

	if (!formProps.name) {
		errors.name = 'Please enter a name!';
	}

	if (!formProps.language) {
		errors.language = 'Please enter a language!';
	}

	if (!formProps.skillLevel) {
		errors.skillLevel = 'Please enter your skill level!';
	}

	return errors;
}

export default reduxForm({
	form: 'profile',
	fields: ['email', 'name', 'language', 'skillLevel'],
	validate
}, mapStateToProps, actions)(Profile);
