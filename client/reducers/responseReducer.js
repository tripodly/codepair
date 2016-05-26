import { AWAITING_RESPONSE, RESPONSE_RECEIVED } from '../actions/actionTypes';

const INITIAL_STATE = { waiting: false };

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case AWAITING_RESPONSE:
			return {...state, waiting: true };

		case RESPONSE_RECEIVED:
			return {...state, waiting: false };

		default:
			return state;
	}
}