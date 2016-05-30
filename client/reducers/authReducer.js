import { AUTHORIZE_USER, DEAUTHORIZE_USER, AUTHORIZE_ERROR } from '../actions/actionTypes';

export default function(state = {}, action) {
	switch(action.type){
		case AUTHORIZE_USER:
			return {...state, error: '', authenticated: true };

		case DEAUTHORIZE_USER:
			return {...state, authenticated: false };

		case AUTHORIZE_ERROR:
			return {...state, error: action.payload};

		default:
			return state;
	}
}