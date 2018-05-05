/**
 * @module Default
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.01.28, 23:51
 * @version 2018.03.26, 21:03
 */

import React, { Fragment } from 'react';
import { decl } from 'bem-react-core';

// import { connect } from 'react-redux';
// import pageMapper from 'redux/mappers/pageMapper';

// import config from 'config';

const Default_proto = /** @lends Default.prototype */{

  block: 'Default',

  /** content ** {{{ */
  content() {
    // TODO!
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    );
  },/*}}}*/

};

export default decl(Default_proto);

