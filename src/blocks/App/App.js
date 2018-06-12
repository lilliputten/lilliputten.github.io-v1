/**
 * @module App
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.01.28, 23:51
 * @version 2018.03.26, 21:03
 */

import React, { Fragment } from 'react';
import { decl } from 'bem-react-core';
import { connect } from 'react-redux';

import pageMapper from 'redux/mappers/pageMapper';

// import config from 'config';

import Spinner from 'e:Spinner';
import Navbar from 'b:Navbar';
import View from 'b:View';
import Footer from 'b:Footer';

const App_proto = /** @lends App.prototype */{

  block: 'App',

  /** getPageState ** {{{ Page state object */
  getPageState(){

    const store = this.props.store;
    const state = store && store.getState();
    return state && state.page;

  },/*}}}*/

  /** willInit ** {{{ */
  willInit() {

    const pageState = this.getPageState();

    // Initial state
    this.state = {...pageState};

    // Subscribe to store for page changing... (Correct redux method to update?)
    this.props.store.subscribe(this.storeEvent.bind(this));

  },/*}}}*/

  /** storeEvent ** {{{ Store state changed event */
  storeEvent() {
    const pageState = this.getPageState();
    this.setState(pageState);
  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    const mode = this.state.mode;
    return {
      ...self.mods,
      mode,
    };
  },/*}}}*/

  // /** attrs ** {{{
  //  */
  // attrs() {
  //   return { style: { border: '1px solid red' } };
  // },/*}}}*/

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        <Spinner/>
        <Navbar mode={this.state.mode} store={this.props.store} />
        <View loadPage hashChange clickHandle mode={this.state.mode} store={this.props.store} />
        <Footer mode={this.state.mode} store={this.props.store} />
      </Fragment>
    );
  },/*}}}*/

};

export default decl(App_proto, connect(pageMapper));

