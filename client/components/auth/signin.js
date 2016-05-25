import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit({ email, password }) {
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div>
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {
		const { handleSubmit, fields: { email, password }} = this.props;

		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<TextField {...email} floatingLabelText="Email" errorText={email.touched && email.error && <div className="error">{email.error}</div>} />
				</fieldset>
				<fieldset className="form-group">
					<TextField {...password} type="password" floatingLabelText="Password" errorText={password.touched && password.error && <div className="error">{password.error}</div>} />
				</fieldset>
				{ this.renderAlert() }
				<RaisedButton type="submit" label="Sign in" primary={true}></RaisedButton>
			</form>
		);
	}
}

function mapStateToProps(state){
	return { errorMessage: state.auth.error };
}

function validate(formProps) {
	const errors = {};

	if (!formProps.email) {
		errors.email = 'Please enter an email';
	}

	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}

	return errors;
}

export default reduxForm({
	form: 'signin',
	fields: ['email','password'],
	validate
}, mapStateToProps, actions)(Signin);
