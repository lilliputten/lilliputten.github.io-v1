import React from 'react';
import ReactDOM from 'react-dom';
// import { decl/* , Bem */ } from 'bem-react-core';

import App from 'b:App';

// console.log('dirname,filename:', __dirname, __filename, module);
// debugger;
import config from 'libs/config.js';
import reactTools from 'libs/react-tools.js';
// const config = require('libs/config.js');
// const reactTools = require('../../libs/react-tools.js');
// const reactTools = require('libs/react-tools.js');
// const ReactDOM = require('react-dom');

// const App = require('../../blocks/App/Header/App-Header.js'); // Not works!
// const App = require('../../blocks/App/App.js'); // Works!

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
