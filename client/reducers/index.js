// Combine reducers will go here
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import cardsReducer from './cardsReducer';
import responseReducer from './responseReducer';

// This is a map of our Redux State object
// e.g. application state: State = { form:..., auth:..., profile:..., cards:..., response:... }

// state.response.waiting is a boolean to show whether client is
// currently waiting for a response from the server
const rootReducer = combineReducers({
	form,
	auth: authReducer,
	profile: profileReducer,
	cards: cardsReducer,
	response: responseReducer
});

export default rootReducer;
