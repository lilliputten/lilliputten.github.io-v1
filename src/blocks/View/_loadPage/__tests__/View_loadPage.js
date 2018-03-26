import React from 'react'

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import reactTools from 'libs/reactTools'

import Enzyme, {mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import config from 'config'
import hashTools from 'libs/hashTools'

import View from 'b:View m:loadPage'

import configureStore from 'redux/configureStore'

const mock = new MockAdapter(axios);

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

Enzyme.configure({ adapter: new Adapter() })

describe('View_loadPage', () => {

  // Create component...
  const wrapper = mount(
    <View loadPage store={store} />
  );
  // Find it...
  const found = wrapper.find('.View');
  // And get instance...
  const instance = reactTools.getDomComponent(found);

  /** beforeAll ** {{{ */
  beforeAll(() => {
  })/*}}}*/
  /** afterAll ** {{{ */
  afterAll(() => {
    wrapper.unmount();
  })/*}}}*/

  /*{{{*/describe('base', () => {

    it('must be found', () => {
      expect(found).toHaveLength(1);
    })

    it('wrapper snapshot', () => {
      expect(wrapper).toMatchSnapshot('wrapper');
    })

    // NOTE: Too expensive snapshot
    // it('match instance snapshot', () => {
    //   expect(instance).toMatchSnapshot('instance');
    // })

    it('state snapshot', () => {
      expect(instance.state).toMatchSnapshot('instance.state');
    })

    it('props snapshot', () => {
      expect(instance.props).toMatchSnapshot('instance.props');
    })

    it('instance of React.Component', () => {
      expect(instance).toBeInstanceOf(React.Component);
    })

    it('default state', () => {
      expect(instance.state).toMatchSnapshot('default state');
      expect(instance.state.mode).toBe(config.site.defaultMode);
    })

  })/*}}}*/

  /*{{{*/describe('getPageState', () => {

    it('is method', () => {
      expect(typeof instance.getPageState).toBe('function');
    })

    it('snapshot', () => {
      expect(instance.getPageState()).toMatchSnapshot('getPageState');
    })

  })/*}}}*/

  /*{{{*/describe('loadPage', () => {

    // Mocking `pageLoader` axios request
    const pageId = 'test/testPage';
    const pageHash = hashTools.fromPageId(pageId);
    const pageUrl = hashTools.toUrl(pageHash, config.site.defaultExt);
    const pageBody = 'page content';
    const pageHtml = '<p>' + pageBody + '</p>\n';

    /** beforeAll ** {{{ */
    beforeAll(() => {

      // Set mocks...
      mock.onAny(pageUrl).reply(200, pageBody);

    })/*}}}*/
    /** afterAll ** {{{ */
    afterAll(() => {

      mock.reset();

    })/*}}}*/


    it('is method', () => {
      expect(typeof instance.loadPage).toBe('function');
    })

    it('returns page data', (done) => {
      instance.loadPage(pageId)
        .then(result => {
          expect(typeof result).toBe('object');
          expect(result).toMatchSnapshot('loadPage result');
          expect(result.body).toBe(pageBody);
          expect(result.html).toBe(pageHtml);
          expect(typeof result.params).toBe('object');
          expect(result.params.pageId).toBe(pageId);

          expect(instance.state).toMatchSnapshot('state after load');
          expect(instance.state.mode).toBe(config.site.contentMode);
          expect(instance.state.page).toBe(pageId);
          // expect(wrapper).toMatchSnapshot('wrapper after load');
        })
        .then(done)
        .catch(done)
    })

  })/*}}}*/

})

