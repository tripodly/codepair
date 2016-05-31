import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; 
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import * as actions from '../../actions';


class Signup extends Component {
	constructor(props){
		super(props);

		this.state = {
			language: this.props.language,
			skillLevel: this.props.skillLevel
		}
	}

	handleFormSubmit(formProps) {
		let formPropsWithLangSkill = {...formProps, language: this.state.language, skillLevel: this.state.skillLevel };
		console.log('formPropsWithLangSkill is : ',formPropsWithLangSkill);
		this.props.signupUser(formPropsWithLangSkill);
	}

	handleLangChange(event, index, value) {
		this.setState({ language: value });
	}

	handleSkillChange(event, index, value) {
		this.setState({ skillLevel: value });
	}

	render() {
		const { handleSubmit, fields: { email, name, github_handle, profile_url, password, passwordConfirm }} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<TextField {...email} floatingLabelText="Email" errorText={email.touched && email.error && <div className="error">{email.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...name} floatingLabelText="Name" errorText={name.touched && name.error && <div className="error">{name.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<SelectField value={this.state.language} floatingLabelText="Please choose your language:" onChange={(event, index, value) => this.handleLangChange(event, index, value)}>
	          <MenuItem value={'JavaScript'} primaryText="JavaScript" />
	          <MenuItem value={'Java'} primaryText="Java" />
	          <MenuItem value={'Python'} primaryText="Python" />
	          <MenuItem value={'Ruby'} primaryText="Ruby" />
	        </SelectField>
				</fieldset>
				<fieldset className="form-group">
					<SelectField value={this.state.skillLevel} floatingLabelText="Please choose your skill level:" onChange={(event, index, value) => this.handleSkillChange(event, index, value)}>
	          <MenuItem value={'Beginner'} primaryText="Beginner" />
	          <MenuItem value={'Mid-Level'} primaryText="Mid-Level" />
	          <MenuItem value={'Experienced'} primaryText="Experienced" />
	          <MenuItem value={'Master'} primaryText="Master" />
	        </SelectField>
				</fieldset>
				<fieldset className="form-group">
					<TextField {...github_handle} floatingLabelText="Enter a GitHub handle" errorText={github_handle.touched && github_handle.error && <div className="error">{github_handle.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...profile_url} floatingLabelText="Enter a link to your profile picture" errorText={profile_url.touched && profile_url.error && <div className="error">{profile_url.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...password} type="password" floatingLabelText="Password" errorText={password.touched && password.error && <div className="error">{password.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...passwordConfirm} type="password" floatingLabelText="Confirm your password:" errorText={passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>} />
				</fieldset>
				<RaisedButton type="submit" label="Sign up!" primary={true}></RaisedButton>
			</form>
		);
	}
}

// <TextField {...language} floatingLabelText="Language" errorText={language.touched && language.error && <div className="error">{language.error}</div>} />
// <TextField {...skillLevel} floatingLabelText="Skill Level" errorText={skillLevel.touched && skillLevel.error && <div className="error">{skillLevel.error}</div>} />


function mapStateToProps(state){
	console.log('mapStateToProps inside signup form , state.form is : ',state.form);
	return { errorMessage: state.auth.error, language: state.profile.language, skillLevel: state.profile.skillLevel };
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

	// if (!formProps.skillLevel) {
	// 	errors.skillLevel = 'Please enter your skill level!';
	// }

	if (!formProps.github_handle) {
		errors.github_handle = 'Please enter your GitHub handle!';
	}

	if (formProps.password !== formProps.passwordConfirm){
		errors.password = 'Passwords must match';
	}

	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}

	if (!formProps.passwordConfirm) {
		errors.passwordConfirm = 'Please enter a password confirmation';
	}

	return errors;
}

export default reduxForm({
	form: 'signup',
	fields: ['email', 'name', 'github_handle', 'profile_url', 'password', 'passwordConfirm'],
	validate
}, mapStateToProps, actions)(Signup);
