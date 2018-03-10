import React from 'react'
import ReactDOM from 'react-dom'

import App from 'b:App'

import config from 'libs/config.js'
import reactTools from 'libs/react-tools.js'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
