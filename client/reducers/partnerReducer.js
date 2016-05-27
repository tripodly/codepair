import { SET_PARTNER, CLEAR_PARTNER } from '../actions/actionTypes';

const INITIAL_STATE = { id: null, name: '', language: '', skillLevel: '', github_handle: null, profile_url: null }

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case SET_PARTNER:
			
			return {...state, error: '', authenticated: true };

		case CLEAR_PARTNER:
			return {...state, id: null, name: '', language: '', skillLevel: '', github_handle: null, profile_url: null };

		default:
			return state;
	}
}