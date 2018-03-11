import React from 'react'
// import ReactDOM from 'react-dom'

// import renderer from 'react-test-renderer'

import Enzyme, { mount/* , shallow */ } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from 'b:App'

// import reactTools from 'libs/react-tools'

Enzyme.configure({ adapter: new Adapter() })

// import config from 'libs/config.js'
// import reactTools from 'libs/react-tools.js'

describe('App', () => {

  let appWrapper, app;

  beforeAll(() => {
    appWrapper = mount(
      <App />
    );
    app = appWrapper.instance();
  })

  afterAll(() => {
    appWrapper.unmount();
  })

  it('match snapshot', () => {
    expect(appWrapper).toMatchSnapshot();
  })

  it('contains View', () => {
    // get ReactWrapper object by querySelector
    const childWrapper = appWrapper.find('.View');
    expect(childWrapper).toHaveLength(1);
  })

  it('is instance of React.Component', () => {
    expect(app).toBeInstanceOf(React.Component);
  })

  it('contains testMethod', () => {
    expect(app.testMethod).toBeInstanceOf(Function);
  })

})
