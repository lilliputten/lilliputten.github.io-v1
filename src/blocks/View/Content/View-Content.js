/**
 * @module View-Content
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.12, 01:29
 * @version 2018.03.20, 00:59
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { decl, Bem } from 'bem-react-core';
import { connect } from 'react-redux'
// import reactTools from 'libs/reactTools'
// import hashTools from 'libs/hashTools'
// import jquery from 'jquery'

import 'e:ContentWrapper'

// import 'm:rawhtml'

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

/** __Content_static ** {{{ */
const __Content_static = /** @lends View-Content */{

  propTypes: {
    dispatch : PropTypes.func.isRequired,
    page : PropTypes.string.isRequired,
    html : PropTypes.string,
  },

};/*}}}*/

function mapStateToProps(state) {
  const { page } = state.page || {};
  return { page };
}
export default decl(__Content_proto, __Content_static, connect(mapStateToProps));
