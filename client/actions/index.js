// Actions will go here
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTHORIZE_USER, DEAUTHORIZE_USER, AUTHORIZE_ERROR, CLEAR_USER, UPDATE_USER, GET_CARDS, LIKE_CARD, DISLIKE_CARD, NEW_MATCH, NEW_PENDING, NEW_PASS } from './actionTypes';

const API_URL = 'http://localhost:3090';

// signinUser action creator uses redux-thunk to return a function
// takes object with email and password properties
export function signinUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/user/signin`, { email, password })
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

export function signupUser({ email, name, language, skillLevel, password, github_handle, profile_url }) {
	return function(dispatch) {
		axios.post(`${API_URL}/user/signup`, { email, name, language, skillLevel, password, github_handle, profile_url })
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
					id: id, email: email, name: name, language: language, skillLevel: skillLevel, github_handle: github_handle, profile_url: `https://github.com/${github_handle}.png`
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

export function getUserInfo() {
	console.log('inside getUserInfo action creator');
	return function(dispatch) {
		axios.get(`${API_URL}/user/profile`, { 
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(response => {
				console.log(response);
				// dispatch action to set current users info
				dispatch({ type: UPDATE_USER, payload: { 
					id: response.data.id, email: response.data.email, name: response.data.name, language: response.data.language, skillLevel: response.data.skillLevel, github_handle: response.data.github_handle, profile_url: response.data.profile_url
				}});
			})
			.catch(response => {
				console.log('error in getUserInfo action creator: ',response);
				dispatch(authError(response.data));
				dispatch(signoutUser());
				browserHistory.push('/');
			})
	}
}

export function updateUserInfo({ email, name, language, skillLevel, github_handle, profile_url }) {
	return function(dispatch) {
		axios.post(`${API_URL}/user/update`, { email, name, language, skillLevel })
			.then(response => {
				dispatch({ type: UPDATE_USER, payload: { 
					email: email, name: name, language: language, skillLevel: skillLevel, github_handle: github_handle, profile_url: profile_url
				}});
			})
			.catch(response => {
				console.log('error in signupUser action creator: ',response);
				// -Show an error to the user
				dispatch(authError(response));
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
	return function(dispatch) {
		dispatch({ type: DEAUTHORIZE_USER });
		dispatch({ type: CLEAR_USER });
	}
}

// action creator to get new card from database, passes email to identify user and get 
// a card from their pending list
export function getCards() {
	console.log('getCards action creator called');
	return function(dispatch) {
		axios.get(`${API_URL}/user/cards`, { 
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(response => {
				console.log('getCards response received');
				console.log('getCards response is : ',response);
				dispatch({ type: GET_CARDS, payload: response.data })
			})
			.catch(response => {
				// if there is an error from the post to the server,
				// log it
				console.log('error in getCard action creator: ',response);
			})
	}
}

export function likeCard({ from_id, to_id }) {
	return function(dispatch) {
		axios.post(`${API_URL}/cards/like`, { from_id, to_id }, { 
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(response => {
				console.log('likeCard response received');
				console.log('likeCard response is : ',response);

				// If this swipe triggers a match, dispatch the NEW_MATCH action
				if(response.data.match) {
					dispatch({ type: NEW_MATCH, payload: response.data.model })
				} else {
					dispatch({ type: NEW_PENDING, payload: response.data.model });
				}
			})
			.catch(response => {
				console.log('error in likeCard action creator: ',response);
			})
	}
}

export function dislikeCard({ from_id, to_id }) {
	return function(dispatch) {
		axios.post(`${API_URL}/cards/dislike`, { from_id, to_id }, { 
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(response => {
				console.log('dislikeCard response received');
				console.log('dislikeCard response is : ',response);
				dispatch({ type: NEW_PASS, payload: response.data.model })
			})
			.catch(response => {
				console.log('error in dislikeCard action creator: ',response);
			})
	}
}