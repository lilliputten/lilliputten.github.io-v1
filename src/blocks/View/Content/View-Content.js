/**
 * @module View-Content
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.12, 01:29
 * @version 2018.03.26, 20:58
 */

import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { decl, Bem } from 'bem-react-core';

import 'e:ContentWrapper'

// import 'm:rawhtml' // TODO?

const __Content_proto = /** @lends View-Content.prototype */{

  block: 'View',
  elem: 'Content',

  /** content ** {{{ */
  content() {

    return (
      <Fragment>
        <Bem
          elem="ContentWrapper"
          ref={(node) => { this._wrapper = node; }}
          dangerouslySetInnerHTML={{ __html: this.props.html || '' }}
        />
      </Fragment>
    );

  },/*}}}*/

}

export default decl(__Content_proto);
