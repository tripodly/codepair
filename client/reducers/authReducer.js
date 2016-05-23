import { AUTHORIZE_USER } from '../actions/actionTypes';

export default function(state = {}, action) {
	switch(action.type){
		// if actionType is AUTHORIZE_USER
		case AUTHORIZE_USER:
			// change authenticated state of user to be true 
			return {...state, authenticated: true };
		default:
			return state;
	}
}