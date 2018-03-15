/**
 * @module View_hashChange
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.13, 01:30
 * @version 2018.03.13, 02:13
 */

// import React, { Fragment } from 'react';
import { declMod } from 'bem-react-core'
import PropTypes from 'prop-types'
// import { Bem } from 'bem-react-core';
// import TodoTextInput from './TodoTextInput'

import config from 'libs/config'

const getLocationHash = () => {
  return window.location.hash;
};

const _hashChange_proto = /** @lends View_hashChange.prototype */{

  block : 'View',

  /** willInit ** {{{ */
  willInit() {

    this.__base.apply(this, arguments);

    this.state = {
      hash : this.props.getLocationHash(),
    };

  },/*}}}*/

  /** handleHashChange ** {{{ */
  handleHashChange() {

    const hash = this.props.getLocationHash();

    // this.props.onChange({ hash });
    this.setState({ hash });

    this.onHashChange && this.onHashChange(this.getHashUrl(hash));

  },/*}}}*/

  /** getHashUrl ** {{{ Get url from hash
   * @param {String} [url] - default value
   * @return {String}
   */
  getHashUrl(url) {

    url = url || this.props.getLocationHash();

    debugger;
    if (url.startsWith('#')) {
      url = url.substr(1);
    }

    if (!url.startsWith(config.site.rootPrefix) && url.startsWith('/')) {
      url = config.site.rootPrefix + url;
    }

    return url;

  },/*}}}*/

  /** setHashUrl ** {{{ Set hash by url
   * @param {String} url
   */
  setHashUrl(url) {

    if (url.startsWith(config.site.rootPrefix)) {
      url = url.substr(config.site.rootPrefix.length);
    }

    window.location.hash = url;

  },/*}}}*/

  /** componentDidMount ** {{{ */
  componentDidMount() {

    this.__base.apply(this, arguments);

    window.addEventListener('hashchange', this.handleHashChange.bind(this), false);

  },/*}}}*/

  /** componentWillUnmount ** {{{ */
  componentWillUnmount() {

    this.__base.apply(this, arguments);

    window.removeEventListener('hashchange', this.handleHashChange, false);

  },/*}}}*/

}

export default declMod(function(){ return this.props.mods.hashChange }, _hashChange_proto, /** @lends View_hashChange */{

  /** propTypes ** {{{ */
  propTypes : {
    getLocationHash : PropTypes.func,
  },/*}}}*/

  /** defaultProps ** {{{ */
  defaultProps : {
    getLocationHash : getLocationHash,
  },/*}}}*/

});


