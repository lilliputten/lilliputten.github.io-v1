/**
 * @module configureStore
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 02:42
 * @version 2018.03.19, 23:52
 */

import config from 'config'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './reducers/pageReducer'

const rootReducer = combineReducers({
  page : pageReducer
});

let middlerwaresList = [applyMiddleware(thunk)];
// Adding Redux DevTools if debugging...
if (config.DEBUG && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  middlerwaresList.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
const enhancer = compose.apply(null, middlerwaresList);

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, enhancer);
}
