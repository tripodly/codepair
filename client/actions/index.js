// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTHORIZE_USER, DEAUTHORIZE_USER, AUTHORIZE_ERROR, UPDATE_USER, GET_CARD, LIKE_CARD, DISLIKE_CARD } from './actionTypes';

const API_URL = 'http://localhost:3090';

// signinUser action creator uses redux-thunk to return a function
// takes object with email and password properties
export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/signin`, { email, password })
			.then(response => {
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
			.catch(response => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in signinUser action creator: ',response);
				// -Show an error to the user
				dispatch(authError('Bad Signin Info'));
			});
	}
}

export function signupUser({ email, name, language, skillLevel, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/signup`, { email, name, language, skillLevel, password })
			.then(response => {
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
			.catch(response => {
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
			.then(response => {
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
			.catch(response => {
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

// action creator to get new card from database, passes email to identify user and get 
// a card from their pending list
export function getCard({ email }) {
	return function(dispatch) {
		axios.post(`${API_URL}/cards/fetch`, { email })
			.then(response => {
				dispatch({ type: GET_CARD, payload: response.data })
			})
			.catch(response => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in getCard action creator: ',response);
			})
	}
}

export function likeCard() {
	return function(dispatch) {
		axios.post(`${API_URL}/cards/like`, {})
			.then(response => {
				dispatch({ type: LIKE_CARD, payload: response.data })
			})
			.catch(response => {
				console.log('error in likeCard action creator: ',response);
			})
	}
}

export function dislikeCard() {
	return function(dispatch) {
		axios.post(`${API_URL}/cards/dislike`, {})
			.then(response => {
				dispatch({ type: DISLIKE_CARD, payload: response.data })
			})
			.catch(response => {
				console.log('error in dislikeCard action creator: ',response);
			})
	}
}