// Cards Reducer will handle state changes for matches and swipes
import { GET_CARDS, CLEAR_CARDS, LIKE_CARD, DISLIKE_CARD, NEW_MATCH, NEW_PENDING, NEW_PASS } from '../actions/actionTypes';


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
		
		case NEW_MATCH:
			console.log('NEW_MATCH action received in cardsReducer');
			var newMatches = matches.slice();
			newMatches.push(state.current);
			var newInitiatedCards = initiatedCards.slice();
			var newUninitiatedCards = uninitiatedCards.slice();
			var newCurrent = newInitiatedCards.length !== 0 ? newInitiatedCards.shift() : newUninitiatedCards.length !== 0 ? newUninitiatedCards.shift() : null;
			if(!newCurrent){
				return {...state, current: null, initiated: [], uninitiated: [], matches: [] };
			}

			return {...state, current: newCurrent, initiated: newInitiatedCards, uninitiated: newUninitiatedCards, matches: newMatches };
		
		case NEW_PENDING:
			console.log('NEW_PENDING action received in cardsReducer');
			var newInitiatedCards = initiatedCards.slice();
			var newUninitiatedCards = uninitiatedCards.slice();
			var newCurrent = newInitiatedCards.length !== 0 ? newInitiatedCards.shift() : newUninitiatedCards.length !== 0 ? newUninitiatedCards.shift() : null;
			if(!newCurrent){
				return {...state, current: null, initiated: [], uninitiated: [], matches: [] };
			}
			return {...state, current: newCurrent, initiated: newInitiatedCards, uninitiated: newUninitiatedCards };
		
		case NEW_PASS:
			console.log('NEW_PASS action received in cardsReducer');
			var newInitiatedCards = initiatedCards.slice();
			var newUninitiatedCards = uninitiatedCards.slice();
			var newCurrent = newInitiatedCards.length !== 0 ? newInitiatedCards.shift() : newUninitiatedCards.length !== 0 ? newUninitiatedCards.shift() : null;
			if(!newCurrent){
				return {...state, current: null, initiated: [], uninitiated: [], matches: [] };
			}
			return {...state, current: newCurrent, initiated: newInitiatedCards, uninitiated: newUninitiatedCards };

		default:
			return state;
	}
}