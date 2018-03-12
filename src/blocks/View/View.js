/**
 * @module View
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.11, 04:44
 *
 * TODO:
 *
 *  - 2018.03.11, 04:42 -- Move pages loading & parsing to separate modules.
 *  - 2018.02.24, 03:22 -- Dynamically load file on state update.
 */

// import React, { Fragment } from 'react'
import { decl } from 'bem-react-core'
import PropTypes from 'prop-types'

import 'm:mode=ready|loading|error'

import 'm:hashChange'

import config from 'libs/config'
// import reactTools from 'libs/reactTools'
import fileLoader from 'libs/fileLoader'

import PagesParser from 'libs/PagesParser'

const View_proto = /** @lends View.prototype */{

  block: 'View',

  /** _delay ** {{{ DEBUG: Timeout
   * @return {Promise}
   */
  _delay(timeout=1000){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve();
      }, timeout)
    });
  },/*}}}*/

  /** willInit ** {{{ */
  willInit() {

    this.__base.apply(this, arguments);

    this.parser = new PagesParser();

    this.state = {
      mode : 'loading',
      // hashChange : true,
      DEBUG : config.DEBUG,
    };

    // this.handleDoubleClick = this.handleDoubleClick.bind(this);

  },/*}}}*/

  /** componentWillMount ** {{{ */
  componentWillMount() {

    this.__base.apply(this, arguments);

    // Initial content...
    this.updateContent();

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

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      DEBUG : this.state.DEBUG,
      mode : this.state.mode,
    };
  },/*}}}*/

  /** onHashChange ** {{{ Hash change event
   * @param {String} url
   */
  onHashChange(url) {
    return this.updateContent(url);
  },/*}}}*/

  /** onLinkClick ** {{{ Set new url
   * @param {String} url
   */
  onLinkClick(url) {
    this.setHashUrl && this.setHashUrl(url);
    // window.location.hash = url;
  },/*}}}*/

  /** updateContent ** {{{ Update page content on url changing
   * @param {String} [url] - Url to show
   * @return {Promise}
   */
  updateContent(url) {

    url = url || (this.getHashUrl && this.getHashUrl()) || this.props.defaultUrl;

    // Mode: loading
    this.setState({ mode : 'loading' });

    return Promise.resolve(null)

      // Debugging delay...
      .then(() => this._delay(1000))

      // Loading file...
      .then(() => fileLoader.load(url))

      // Parsing content...
      .then((content) => this.parser.parse(content))

      // Check data...
      .then(data => {
        let err;
        if (!data || typeof data !== 'object') {
          err = 'Parsed data must be an object!';
        }
        else if (data.html == null || typeof data.html !== 'string') {
          err = 'Parsed data.html must be a string!';
        }
        // Throwing error...
        if (err) {
          console.error(err);
          /*DEBUG*/debugger;
          // throw new Error(err);
          return Promise.reject(err);
        }
        // Pass data if ok...
        return data;
      })

      // Processing verified data...
      .then(data => {
        if ( typeof window === 'object' && window.location ) {
          // console.log(window.location);
          // debugger;
          // window.location.hash = url;
        }
        this.setState({
          url : url,
          mode : 'ready',
          // data : data,
          attributes: data.attributes || {},
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

}

export default decl(View_proto, /* @lends View */{

  /** propTypes ** {{{ */
  propTypes : {
    defaultUrl : PropTypes.string,
    // html : PropTypes.string,
  },/*}}}*/

  /** defaultProps ** {{{ */
  defaultProps : {
    defaultUrl : '/site/test/test.md',
    // html : '--NONE--',
  },/*}}}*/

});

