import { CLEAR_USER, UPDATE_USER } from '../actions/actionTypes';

const INITIAL_STATE = { 
	id: "",
	email: "",
	name: "",
	language: "",
	skillLevel: "",
	github_handle: "",
	profile_url: "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png"
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case CLEAR_USER:
			return {...state, id: "", email: "", name: "", language: "", skillLevel: "", github_handle: "", profile_url: "" }; 
		// if actionType is UPDATE_USER
		case UPDATE_USER:
			console.log('UPDATE_USER action received in profileReducer');
			// change authenticated state of user to be true 
			return {...state, id: action.payload.id, email: action.payload.email, name: action.payload.name, language: action.payload.language, skillLevel: action.payload.skillLevel, github_handle: action.payload.github_handle, profile_url: action.payload.profile_url };
		default:
			return state;
	}
}