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
import Profile from './components/profile';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
   <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
    	<Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="profile" component={Profile} />
    	</Route>
    </Router>
	 </MuiThemeProvider>
  </Provider>
  , document.getElementById('app'));