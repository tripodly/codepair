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
		default:
			return state;
	}
}