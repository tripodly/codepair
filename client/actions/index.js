// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTHORIZE_USER, DEAUTHORIZE_USER, AUTHORIZE_ERROR } from './actionTypes';

const API_URL = 'http://localhost:3090';

// signinUser action creator uses redux-thunk to return a function
// takes object with email and password properties
export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/signin`, { email, password })
			.then( (response) => {
				// if signin is successful, dispatch an action
				// of type AUTHORIZE_USER
				dispatch({ type: AUTHORIZE_USER });
				// -Save the JWT token
				localStorage.setItem('token', response.data.token);
				// if signin is successful push user
				// to our cards page
				// browserHistory.push('/cards');
			})
			.catch((error) => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in signinUser action creator: ',error);
				// -Show an error to the user
				dispatch(authError('Bad Signin Info'));
			});
	}
}

export function signupUser({ email, name, language, skillLevel, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/signup`, { email, name, language, skillLevel, password })
			.then( (response) => {
				// if signup is successful, dispatch an action
				// of type AUTHORIZE_USER
				dispatch({ type: AUTHORIZE_USER });
				// -Save the JWT token
				localStorage.setItem('token', response.data.token);
				// if signup is successful push user
				// to our cards page
				// browserHistory.push('/cards');
			})
			.catch((error) => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in signupUser action creator: ',error);
				// -Show an error to the user
				dispatch(authError(response.data.error));
			});
	}
}

export function authError(error) {
	return {
		type: AUTHORIZE_ERROR,
		payload: error
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	return { type: DEAUTHORIZE_USER };
}