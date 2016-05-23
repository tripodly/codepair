// Combine reducers will go here
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';


const rootReducer = combineReducers({
	form,
	auth: authReducer,
	profile: profileReducer
});

export default rootReducer;
