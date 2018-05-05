import React from 'react';

// import { block, getClassNames } from '.jest/helpers';

// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';

import reactTools from 'libs/reactTools';

import Enzyme from 'enzyme';
import {mount} from 'enzyme';
// import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import config from 'config';
// import hashTools from 'libs/hashTools';

import View from 'b:View';

import configureStore from 'redux/configureStore';

// const mock = new MockAdapter(axios);

const initialState = window.REDUX_INITIAL_STATE || {};
const store = configureStore(initialState);

Enzyme.configure({ adapter: new Adapter() })

describe('View', () => {

  const wrapper = mount(
    <View store={store} />
  );
  const found = wrapper.find('.View');
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
    //
    // it('match state snapshot', () => {
    //   expect(instance.state).toMatchSnapshot('instance.state');
    // })
    //
    // it('match props snapshot', () => {
    //   expect(instance.props).toMatchSnapshot('instance.props');
    // })

    it('is instance of React.Component', () => {
      expect(instance).toBeInstanceOf(React.Component);
    })

  })/*}}}*/

})

