import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 

export default class Signin extends Component {

	render() {
		return (
			<form>
				<fieldset>
					<label>Email:</label>
					<input />
				</fieldset>
				<fieldset>
					<label>Password:</label>
					<input />
				</fieldset>
				<button action="submit" className="btn btn-primary">Sign in</button>
			</form>
		);
	}
}
