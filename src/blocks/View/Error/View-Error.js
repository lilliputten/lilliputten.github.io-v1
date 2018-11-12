/**
 * @module View-Error
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.11.12 22:47
 * @version 2018.11.12 22:47
 */

import { decl, Bem } from 'bem-react-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
// import { connect } from 'react-redux';

// import config from 'config';

const __Error = /** @lends View-Error.prototype */ {

  block: 'View',

  elem: 'Error',

  /** willInit ** {{{ */
  willInit() {

    this.state = {
      mode: this.props.mode,
    };

    // Subscribe to store for page changing...
    this.props.store && this.storeEvent && this.props.store.subscribe(this.storeEvent.bind(this));

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
    const error = this.props.error || 'Undefined error';
    const title = this.props.title || 'Error';
    return (
      <Fragment>
        <Bem elem="ErrorTitle" tag="h1" cls="title title_h1">
          <div cls="title-inset" data-text={title}>{title}</div>
        </Bem>
        <Bem elem="ErrorText" tag="p">{error}</Bem>
      </Fragment>
    );
  },/*}}}*/

}

/** Static... ** {{{ */
const __Error_static = /* @lends View-Error */ {

  propTypes: {
    mode: PropTypes.string.isRequired,
  },

}/*}}}*/

export default decl(__Error, __Error_static);
