import React from 'react'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import Enzyme, { mount/* , shallow */ } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import config from 'config'
import hashTools from 'libs/hashTools'

import App from 'b:App'

import configureStore from 'redux/configureStore'

const mock = new MockAdapter(axios);

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {

  let appWrapper, app;

  // Default page...
  const pageId = config.site.defaultPage;
  const pageHash = hashTools.fromPageId(pageId);
  const pageUrl = hashTools.toUrl(pageHash, config.site.defaultExt);
  const paramsUrl = hashTools.toUrl(pageHash, config.site.dataExt);
  const pageBody = 'page content';
  // const pageHtml = '<p>' + pageBody + '</p>\n';
  const paramsBody = '{"test":"ok"}';
  // const paramsData = { test : 'ok' };

  // Default page mocks...
  mock.onAny(pageUrl).reply(200, pageBody);
  mock.onAny(paramsUrl).reply(200, paramsBody);

  beforeAll(() => {
    appWrapper = mount(
      <App store={store} />
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

})
