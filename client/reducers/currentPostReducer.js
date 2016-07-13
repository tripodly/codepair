import { CURRENT_POST } from '../actions/actionTypes';
const INITIAL_STATE = {current:{},comments:[]}
export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case(CURRENT_POST):
			return {...state, current: action.payload.currentPost, comments: action.payload.comments};
		default: 
			return state;
	}
}