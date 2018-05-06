/**
 * @module Footer
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.05.06 02:55
 * @version 2018.05.06 02:55
 */

import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
// import { connect } from 'react-redux';

// import config from 'config';

const Footer = /** @lends Footer.prototype */ {

  block: 'Footer',

  /** willInit ** {{{ */
  willInit() {

    this.state = {
      mode: this.props.mode,
    };

    // Subscribe to store for page changing...
    this.props.store && this.storeEvent && this.props.store.subscribe(this.storeEvent.bind(this));

  },/*}}}*/

  /** getPageState ** {{{ Page state object */
  getPageState(){

    const store = this.props.store;
    const state = store && store.getState();
    return state && state.page;

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
        Footer
      </Fragment>
    );
  },/*}}}*/

}

/** Static... ** {{{ */
const Footer_static = /* @lends Footer */ {

  propTypes: {
    mode: PropTypes.string.isRequired,
  },

}/*}}}*/

export default decl(Footer, Footer_static);
