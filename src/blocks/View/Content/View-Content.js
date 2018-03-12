/**
 * @module View-Content
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.12, 01:29
 * @version 2018.03.12, 01:29
 */

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { decl, Bem } from 'bem-react-core';

import config from 'libs/config'
import reactTools from 'libs/reactTools'
import jquery from 'jquery'

import 'e:ContentWrapper'

const __Content_proto = /** @lends View-Content.prototype */{

  block : 'View',
  elem : 'Content',

  // /** willInit ** {{{ */
  // willInit() {
  // },/*}}}*/

  /** componentDidMount ** {{{ */
  componentDidMount() {
    this.__base.apply(this, arguments);
    console.log('View-Content componentDidMount', this._wrapper);
    this.onContentCreated();
  },/*}}}*/

  // /** componentDidUpdate ** {{{ */
  // componentDidUpdate() {
  //   this.__base.apply(this, arguments);
  //   console.log('View-Content componentDidUpdate');
  //   this.onContentCreated();
  // },/*}}}*/

  /** onLinkClick ** {{{ Event on link clicked */
  onLinkClick(e) {
    const link = e.currentTarget;
    const url = reactTools.getRelativeUrl(link.href);
    // If url starts with content root prefix...
    if ( url.startsWith(config.siteRootPrefix) ) {
      console.log('View-Content link clicked', url);
      // Call parent for change url...
      this.props.onLinkClick && this.props.onLinkClick(url);
      return false;
    }
    return true;
  },/*}}}*/

  /** onContentCreated ** {{{ When content created or updated */
  onContentCreated() {
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
          dangerouslySetInnerHTML={{ __html : this.props.html }}
        />
      </Fragment>
    );

  },/*}}}*/

}

export default decl(__Content_proto, /** @lends View-Content */{

  /** propTypes ** {{{ */
  propTypes : {
    onLinkClick : PropTypes.func,
  },/*}}}*/

  /** defaultProps ** {{{ */
  defaultProps : {
    // getLocationHash : null,
  },/*}}}*/

});
