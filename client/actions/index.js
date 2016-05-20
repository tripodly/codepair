// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTHORIZE_USER } from './actionTypes';

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

				// if signin is successful push user
				// to our cards page
				// browserHistory.push('/cards');
			})
			.catch((error) => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in signinUser action creator: ',error);
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

				// if signup is successful push user
				// to our cards page
				// browserHistory.push('/cards');
			})
			.catch((error) => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in signupUser action creator: ',error);
			});
	}
}