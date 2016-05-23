// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTHORIZE_USER, DEAUTHORIZE_USER, AUTHORIZE_ERROR, UPDATE_USER } from './actionTypes';

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
				// dispatch action to set current users info
				dispatch({ type: UPDATE_USER, payload: { 
					email: response.data.email, name: response.data.name, language: response.data.language, skillLevel: response.data.skillLevel
				}});
				// if signin is successful push user
				// to their profile page
				browserHistory.push('/profile');
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
				// to their profile page
				browserHistory.push('/profile');
				// dispatch action to set current users info
				dispatch({ type: UPDATE_USER, payload: { 
					email: email, name: name, language: language, skillLevel: skillLevel
				}});
			})
			.catch((response) => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in signupUser action creator: ',response);
				// -Show an error to the user
				dispatch(authError(response));
			});
	}
}

export function updateUserInfo({ email, name, language, skillLevel }) {
	return function(dispatch) {
		axios.post(`${API_URL}/updateInfo`, { email, name, language, skillLevel })
			.then( (response) => {
				// if signup is successful, dispatch an action
				// of type AUTHORIZE_USER
				// dispatch({ type: AUTHORIZE_USER });
				// -Save the JWT token
				// localStorage.setItem('token', response.data.token);
				// if signup is successful push user
				// to their profile page
				// browserHistory.push('/profile');
				// dispatch action to set current users info
				dispatch({ type: UPDATE_USER, payload: { 
					email: email, name: name, language: language, skillLevel: skillLevel
				}});
			})
			.catch((response) => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in signupUser action creator: ',response);
				// -Show an error to the user
				// dispatch(authError(response));
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