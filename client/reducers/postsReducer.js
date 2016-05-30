// Cards Reducer will handle state changes for matches and swipes
import { GET_POSTS } from '../actions/actionTypes';

const INITIAL_STATE = { 
	posts: [],
	comments:[]
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case GET_POSTS:
		var posts = action.payload.slice();
		console.log('payload =====',posts)
			return {...state, posts:posts };
		default:
			return state;
	}
}