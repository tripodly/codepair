import messages from './messages';

import typers from './typers';

import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
  messages,
  channels,
  activeChannel,
  auth,
  typers,
  welcomePage,
  userValidation,
  environment,
  formReducer
});

export default chatReducer;
