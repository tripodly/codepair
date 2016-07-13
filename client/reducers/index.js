// Combine reducers will go here
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import cardsReducer from './cardsReducer';
import partnerReducer from './partnerReducer';
import responseReducer from './responseReducer';
import messagesReducer from './chatReducers/messagesReducer';
import typingReducer from './chatReducers/typingReducer';
import postsReducer from './postsReducer';
import currentPost from './currentPostReducer';
import commentsReducer from './commentsReducer';


// This is a map of our Redux State object
// e.g. application state: State = { form:..., auth:..., profile:..., cards:..., messages:..., typing:..., partner:..., response:... }

// state.response.waiting is a boolean to show whether client is
// currently waiting for a response from the server
const rootReducer = combineReducers({
	form,
	auth: authReducer,
	profile: profileReducer,
	cards: cardsReducer,
  messages: messagesReducer,
  typing: typingReducer,
	partner: partnerReducer,
	response: responseReducer,
	posts: postsReducer,
	comments: commentsReducer,
	currentPost: currentPost
});

export default rootReducer;
