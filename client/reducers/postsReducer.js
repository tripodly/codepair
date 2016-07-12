// Cards Reducer will handle state changes for matches and swipes
import { GET_POSTS, GET_COMMENTS } from '../actions/actionTypes';

const INITIAL_STATE = { 
	posts: [],
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case GET_POSTS:
			var posts = action.payload.slice();
			return {...state, posts: action.payload };
		default:
			return state;
	}
}