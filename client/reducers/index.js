// Combine reducers will go here
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import cardsReducer from './cardsReducer';

const rootReducer = combineReducers({
	form,
	auth: authReducer,
	profile: profileReducer,
	cards: cardsReducer
});

export default rootReducer;
