/**
 * @module Navbar
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.26, 20:00
 * @version 2018.03.26, 20:58
 */

import React, { Fragment } from 'react';
import { decl, Bem } from 'bem-react-core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import pageMapper from 'redux/mappers/pageMapper';

import 'e:Logo';
import 'e:Menu';

// import config from 'config';

const Navbar_proto = /** @lends Navbar.prototype */{

  block: 'Navbar',

  /** getPageState ** {{{ Page state object */
  getPageState(){

    const store = this.props.store;
    const state = store && store.getState();
    return state && state.page;

  },/*}}}*/

  /** willInit ** {{{ */
  willInit() {

    this.state = {
      mode: this.props.mode, // config.site.defaultMode,
    };

    // Subscribe to store for page changing... (Correct redux method to update?)
    this.props.store.subscribe(this.storeEvent.bind(this));

  },/*}}}*/

  /** storeEvent ** {{{ Store state changed event */
  storeEvent() {
    const pageState = this.getPageState();
    const mode = pageState.mode;
    this.setState({mode});
  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    const mode = this.state.mode;
    return {
      ...self.mods,
      mode,
    };
  },/*}}}*/

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        <Bem elem="Logo">Logo</Bem>
        <Bem elem="Menu">Menu</Bem>
      </Fragment>
    );
  },/*}}}*/

}

/** Navbar_static ** {{{ */
const Navbar_static = /* @lends Navbar */{

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    mode: PropTypes.string.isRequired,
    // page: PropTypes.string,
  },

}/*}}}*/

export default decl(Navbar_proto, Navbar_static, connect(pageMapper));

