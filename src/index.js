import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from 'redux/configureStore';

import registerServiceWorker from './registerServiceWorker';

// import config from 'config';

import 'b:Page';
import App from 'b:App';

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

ReactDOM.render(<App store={store} />, document.getElementById('root'));

registerServiceWorker();
