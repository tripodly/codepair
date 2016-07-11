import {CURRENT_POST} from '../actions/actionTypes';


export default function(state = {}, action){
	switch(action.type){
		case(CURRENT_POST):
			return {...state, action.payload.currentPost};
		default: return state;
	}
}