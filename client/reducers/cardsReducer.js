// Cards Reducer will handle state changes for matches and swipes
import { GET_CARDS, CLEAR_CARDS, LIKE_CARD, DISLIKE_CARD } from '../actions/actionTypes';


const INITIAL_STATE = { 
	current: null,
	initiated: [],
	uninitiated: [],
	matches: []
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case GET_CARDS:
			var initiatedCards = action.payload.cards.initiated;
			var uninitiatedCards = action.payload.cards.uninitiated;
			var current = initiatedCards.length !== 0 ? initiatedCards.shift() : uninitiatedCards.shift();
			console.log('current is set to : ',current);
			return {...state, current: current, initiated: initiatedCards, uninitiated: uninitiatedCards, matches: action.payload.cards.matches };
		case CLEAR_CARDS:
			return {...state, current: null, initiated: [], uninitiated: [], matches: [] };
		default:
			return state;
	}
}