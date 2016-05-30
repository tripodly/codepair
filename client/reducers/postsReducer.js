// Cards Reducer will handle state changes for matches and swipes
import { GET_POSTS, GET_COMMENTS } from '../actions/actionTypes';

const INITIAL_STATE = { 
	posts: [],
	comments:[]
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case GET_POSTS:
			console.log('this is postsreducer action : ',action)
			var posts = action.payload.slice();
			console.log('payload =====',posts)
			return {...state, posts: action.payload, comments: '' };
		case GET_COMMENTS:
			console.log('this is the getComments reducer function',action);
			if(action.payload.length <1){
				return {...state, comments:['No Comments yet'],posts: ''};
			}else{
				return{...state, comments: action.payload, posts: '' };
			}
		default:
			return state;
	}
}