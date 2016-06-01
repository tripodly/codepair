import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './components/app';
import Landing from './components/landing';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Profile from './components/profile';
import Cards from './components/cards';
import CodeShare from './components/codeshare';
import Forum from './components/forum';
import Chat from './components/chat';

import reducers from './reducers';
import { AUTHORIZE_USER } from './actions/actionTypes';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers,window.devToolsExtension ? window.devToolsExtension() : f => f);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if(token) {
  // We need to update application state
  store.dispatch({ type: AUTHORIZE_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="signout" component={Signout} />
        <Route path="profile" component={Profile} />
        <Route path="cards" component={Cards} />
        <Route path="codeshare" component={CodeShare} />
        <Route path="forum" component={Forum} />
        <Route path="chat" component={Chat} />
    	</Route>
    </Router>
	 </MuiThemeProvider>
  </Provider>
  , document.getElementById('app'));