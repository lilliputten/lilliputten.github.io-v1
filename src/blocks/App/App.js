/**
 * @module App
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.01.28, 23:51
 * @version 2018.03.19, 02:53
 */

import React, { Fragment } from 'react'
import { decl/* , Bem */ } from 'bem-react-core'
// import { connect } from 'react-redux'
// import { Provider } from 'react-redux'
import configureStore from 'redux/configureStore'

import Header from 'e:Header'
import View from 'b:View'

const initialState = window.REDUX_INITIAL_STATE || {};

const store = configureStore(initialState);

export default decl({

  block: 'App',

  /** willInit ** {{{ */
  willInit() {
    this.testMethod = this.testMethod.bind(this);
  },/*}}}*/

  /** componentDidMount ** {{{ */
  componentDidMount() {
    // DEBUG: Finding View component
    // this.View = reactTools.findChildBlock(this, 'View');
    // console.log(config, this.View);
  },/*}}}*/

  /** testMethod ** {{{ DEBUG! */
  testMethod() {
    const result = 'testMethod';
    // console.log(result);
    return result;
  },/*}}}*/

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        <Header/>
        <View store={store} mods={{hashChange: true}} />
      </Fragment>
    );
  },/*}}}*/

});
