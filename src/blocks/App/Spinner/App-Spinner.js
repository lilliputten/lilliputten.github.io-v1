/**
 * @module App-Spinner
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.06.12 23:30
 * @version 2018.06.12 23:30
 */

import { decl, Bem } from 'bem-react-core';
import React, { Fragment } from 'react';
// import { connect } from 'react-redux';

// import config from 'config';

import spinnerImg from './spinner-dots.gif';

const __Spinner = /** @lends App-Spinner.prototype */ {

  block: 'App',
  elem: 'Spinner',

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        <Bem elem="SpinnerImg" tag="img" src={spinnerImg} alt="Loading..." />
      </Fragment>
    );
  },/*}}}*/

}

export default decl(__Spinner);
