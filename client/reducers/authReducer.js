import { AUTHORIZE_USER, DEAUTHORIZE_USER, AUTHORIZE_ERROR } from '../actions/actionTypes';

export default function(state = {}, action) {
	switch(action.type){
		// if actionType is AUTHORIZE_USER
		case AUTHORIZE_USER:
			// change authenticated state of user to be true 
			return {...state, error: '', authenticated: true };
		case DEAUTHORIZE_USER:
			return {...state, authenticated: false };
		case AUTHORIZE_ERROR:
			return {...state, error: action.payload};
		default:
			return state;
	}
}