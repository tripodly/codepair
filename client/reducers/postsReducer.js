// Cards Reducer will handle state changes for matches and swipes
import { GET_POSTS, GET_COMMENTS } from '../actions/actionTypes';

const INITIAL_STATE = { 
	posts: [],
	comments:[],
	post:{}
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case GET_POSTS:
			var posts = action.payload.slice();
			return {...state, posts: action.payload, comments: '' };
		case GET_COMMENTS:
			let comments = action.payload.comments.sort((a,b) => {
				return Date.parse(b.created_at) - Date.parse(a.created_at);
			});
			return {...state, comments: comments, post:action.payload.post[0], posts: '' };
		default:
			return state;
	}
}