import { UPDATE_USER } from '../actions/actionTypes';

const INITIAL_STATE = { 
	email: "",
	name: "",
	language: "",
	skillLevel: ""
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		// if actionType is UPDATE_USER
		case UPDATE_USER:
			console.log('UPDATE_USER action received in profileReducer');
			console.log('payload is : ', action.payload);
			// change authenticated state of user to be true 
			return {...state, email: action.payload.email, name: action.payload.name, language: action.payload.language, skillLevel: action.payload.skillLevel };
		default:
			return state;
	}
}