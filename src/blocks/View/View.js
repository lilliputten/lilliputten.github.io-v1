/**
 * @module View
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.19, 02:53
 *
 * TODO:
 *
 *  - 2018.03.11, 04:42 -- Move pages loading & parsing to separate modules.
 *  - 2018.02.24, 03:22 -- Dynamically load file on state update.
 */

// import React, { Fragment } from 'react'
import { decl } from 'bem-react-core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import 'm:mode=ready|loading|error'

import 'm:hashChange'

import PageLoader from 'libs/PageLoader'

const View_proto = /** @lends View.prototype */{

  block: 'View',

  /** willInit ** {{{ */
  willInit() {

    this.__base.apply(this, arguments);

    // Create page loader
    this.pageLoader = new PageLoader();

    this.state = {
      mode : 'loading',
    };

    // ??? Subscribe to store for page changing... (Correct redux method to update?)
    this.props.store.subscribe(() => {
      const state = this.props.store.getState();
      const pageId = state.page.page;
      this.placePage(pageId);
    });

  },/*}}}*/

  /** componentWillMount ** {{{ */
  componentWillMount() {

    this.__base.apply(this, arguments);

    // Place initial page (default or saved)
    this.placePage();

  },/*}}}*/

  // /** componentDidMount ** {{{ */
  // componentDidMount() {
  //   this.__base.apply(this, arguments);
  //   // DEBUG: Finding App component
  //   // this.App = reactTools.findParentBlock(this, 'App');
  //   console.log('View componentDidMount');
  // },/*}}}*/
  // /** componentDidUpdate ** {{{ */
  // componentDidUpdate() {
  //   this.__base.apply(this, arguments);
  //   console.log('View componentDidUpdate');
  // },/*}}}*/

  /** placePage ** {{{ Update page content on url changing
   * @param {String} [pageId] - Url to show
   * @return {Promise}
   */
  placePage(pageId) {

    if (pageId == null ) {
      pageId = this.props.page; // pageId || config.site.defaultPage;
    }

    // Mode: loading
    this.setState({ mode : 'loading' });

    // DEBUG
    console.log('View:placePage', pageId);

    // Load or resolve page data...
    this.pageLoader.resolve(pageId)

      // Set page data...
      .then(data => {
        this.setState({
          pageId : pageId,
          mode : 'ready',
          attributes: data.attributes,
          html : data.html,
        });
      })

      // Error...
      .catch(err => {
        console.error(err);
        /*DEBUG*/debugger;
        this.setState({
          mode : 'error',
          error : err,
        });
      })

    ;

  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      DEBUG : this.state.DEBUG,
      mode : this.state.mode,
    };
  },/*}}}*/

}

/** View_static ** {{{ */
const View_static = /* @lends View */{

  propTypes : {
    dispatch : PropTypes.func.isRequired,
    page : PropTypes.string.isRequired,
  },

}/*}}}*/

function mapStateToProps(state) {
  const { page } = state.page || {};
  return { page };
}
export default decl(View_proto, View_static, connect(mapStateToProps));

