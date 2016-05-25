// Cards Reducer will handle state changes for matches and swipes
import { GET_CARDS, LIKE_CARD, DISLIKE_CARD } from '../actions/actionTypes';



const INITIAL_STATE = { 
	current: null,
	initiated: [],
	uninitiated: [],
	matches: []
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		// if actionType is UPDATE_USER
		case UPDATE_USER:
			console.log('UPDATE_USER action received in profileReducer');
			// change authenticated state of user to be true 
			return {...state, email: action.payload.email, name: action.payload.name, language: action.payload.language, skillLevel: action.payload.skillLevel };
		default:
			return state;
	}
}