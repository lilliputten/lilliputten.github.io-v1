/**
 * @module configureStore
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.19, 02:53
 */

import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './reducers/pageReducer'

export default function configureStore(initialState = {}) {
  const rootReducer = combineReducers({
    page : pageReducer
  });

  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}

/*{{{ Sample code

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
}}}*/
