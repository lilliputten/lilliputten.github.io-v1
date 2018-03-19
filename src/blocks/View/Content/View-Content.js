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
import reactTools from 'libs/reactTools'
import hashTools from 'libs/hashTools'
import jquery from 'jquery'

import 'e:ContentWrapper'

const __Content_proto = /** @lends View-Content.prototype */{

  block: 'View',
  elem: 'Content',

  /** componentDidMount ** {{{ */
  componentDidMount() {
    this.__base.apply(this, arguments);
    this.onContentPlaced();
  },/*}}}*/

  // /** componentDidUpdate ** {{{ */
  // componentDidUpdate() {
  //   this.__base.apply(this, arguments);
  //   this.onContentPlaced();
  // },/*}}}*/

  /** onLinkClick ** {{{ Event on link clicked */
  onLinkClick(e) {

    // Try to get hash from link...
    const link = e.currentTarget;
    const url = reactTools.getRelativeUrl(link.href);
    const hash = hashTools.fromUrl(url);

    // DEBUG
    console.log('View-Content:onLinkClick', link, '->', url, '->', hash);

    // If correct hash...
    if (hashTools.isCorrectHash(hash)) {
      // See hash handler in `:hashChange`
      hashTools.setToWindow(hash);
      return false;
    }

    return true;

  },/*}}}*/

  /** onContentPlaced ** {{{ When content created or updated */
  onContentPlaced() {
    const dom = reactTools.getComponentDom(this._wrapper);
    // Initializing events on all links in wrapper...
    jquery(dom).find('a')
      .off('click')
      .on('click', this.onLinkClick.bind(this))
    ;
  },/*}}}*/

  /** content ** {{{ */
  content() {

    return (
      <Fragment>
        <Bem
          elem="ContentWrapper"
          ref={(node) => { this._wrapper = node; }}
          dangerouslySetInnerHTML={{ __html: this.props.html }}
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
    html : PropTypes.string.isRequired,
  },

};/*}}}*/

function mapStateToProps(state) {
  const { page } = state.page || {};
  return { page };
}
export default decl(__Content_proto, __Content_static, connect(mapStateToProps));
