// Cards Reducer will handle state changes for matches and swipes
import { GET_CARDS, CLEAR_CARDS, LIKE_CARD, DISLIKE_CARD, NEW_MATCH, NEW_PENDING, NEW_PASS } from '../actions/actionTypes';
import shuffle from 'lodash/shuffle';

const INITIAL_STATE = { 
	current: null,
	initiated: [],
	uninitiated: [],
	matches: [],
	waiting: []
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case GET_CARDS:
			var initiatedCards = action.payload.cards.initiated.slice();
			initiatedCards = shuffle(initiatedCards);
			var uninitiatedCards = action.payload.cards.uninitiated.slice();
			uninitiatedCards = shuffle(uninitiatedCards);
			var matched = action.payload.cards.matched.slice();

			var current = initiatedCards.length !== 0 ? initiatedCards.shift() : uninitiatedCards.shift();
			return {...state, current: current, initiated: initiatedCards, uninitiated: uninitiatedCards, matches: matched, waiting: action.payload.cards.waiting };
		
		case CLEAR_CARDS:
			return {...state, current: null, initiated: [], uninitiated: [], matches: [] };
		
		case NEW_MATCH:
			var newMatches = state.matches.slice();
			newMatches.push(state.current);
			var newInitiatedCards = state.initiated.slice();
			var newUninitiatedCards = state.uninitiated.slice();
			var newCurrent = newInitiatedCards.length !== 0 ? newInitiatedCards.shift() : newUninitiatedCards.length !== 0 ? newUninitiatedCards.shift() : null;
			if(!newCurrent){
				return {...state, current: null, initiated: [], uninitiated: [], matches: [] };
			}

			return {...state, current: newCurrent, initiated: newInitiatedCards, uninitiated: newUninitiatedCards, matches: newMatches };
		
		case NEW_PENDING:
			var newInitiatedCards = state.initiated.slice();
			var newUninitiatedCards = state.uninitiated.slice();
			var newWaitingCards = state.waiting.slice();
			newWaitingCards.push(state.current);
			var newCurrent = newInitiatedCards.length !== 0 ? newInitiatedCards.shift() : newUninitiatedCards.length !== 0 ? newUninitiatedCards.shift() : null;
			if(!newCurrent){
				return {...state, current: null, initiated: [], uninitiated: [], matches: [], waiting: newWaitingCards };
			}
			return {...state, current: newCurrent, initiated: newInitiatedCards, uninitiated: newUninitiatedCards, waiting: newWaitingCards };
		
		case NEW_PASS:
			var newInitiatedCards = state.initiated.slice();
			var newUninitiatedCards = state.uninitiated.slice();
			var newCurrent = newInitiatedCards.length !== 0 ? newInitiatedCards.shift() : newUninitiatedCards.length !== 0 ? newUninitiatedCards.shift() : null;
			if(!newCurrent){
				return {...state, current: null, initiated: [], uninitiated: [], matches: [] };
			}
			return {...state, current: newCurrent, initiated: newInitiatedCards, uninitiated: newUninitiatedCards };

		default:
			return state;
	}
}