import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import hashReducer from './reducers/hashReducer';

import View from 'b:View'

const actionCreators = {
  ...View.actions
};

const rootReducer = combineReducers({
  view : View.reducer,
});

const enhancer = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ?
    window.devToolsExtension({ actionCreators }) :
    noop => noop
);

export default function configureStore(initialState = {}) {

  const store = createStore(rootReducer, initialState, enhancer); // applyMiddleware(thunk));

  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot) {
    store.replaceReducer(rootReducer);
  }
  return store;
}
