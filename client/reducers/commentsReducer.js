import {FORUM_DATA} from '../actions/actionTypes';

export default function(state = [], action){
	switch(action.type){
		case(FORUM_DATA):
			return [...state, action.payload]
		default:
			return state;
	}
}

