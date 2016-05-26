import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import promiseMiddleware from '../middleware/asyncMiddleware';
import thunk from 'redux-thunk';
import chatReducer from '../reducers/chat_reducers';

const finalCreateStore = compose(
  applyMiddleware(thunk, promiseMiddleware)
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
