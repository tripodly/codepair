import { USER_INITIATED, CLEAR_USER, UPDATE_USER, JOIN_SESSION, LEAVE_SESSION } from '../actions/actionTypes';

const INITIAL_STATE = {
	initiated: false, 
	id: "",
	email: "",
	name: "",
	language: "JavaScript",
	skillLevel: "Beginner",
	github_handle: "",
	profile_url: "https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png",
	sessionID: ""
};

export default function(state = INITIAL_STATE, action) {
	switch(action.type){
		case USER_INITIATED:
			return {...state, initiated: true };

		case CLEAR_USER:
			return {...state, initiated: false, id: "", email: "", name: "", language: "JavaScript", skillLevel: "Beginner", github_handle: "", profile_url: "" }; 

		case UPDATE_USER:
			return {...state, id: action.payload.id, email: action.payload.email, name: action.payload.name, language: action.payload.language, skillLevel: action.payload.skillLevel, github_handle: action.payload.github_handle, profile_url: action.payload.profile_url };
		
		case JOIN_SESSION:
			return {...state, sessionID: action.payload.sessionID };

		case LEAVE_SESSION:
			return {...state, sessionID: "" };

		default:
			return state;
	}
}