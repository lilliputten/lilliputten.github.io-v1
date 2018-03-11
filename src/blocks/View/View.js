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
 *
 */
import React, { Fragment } from 'react'
import { decl } from 'bem-react-core'
import PropTypes from 'prop-types'

import axios from 'axios'

import 'm:mode=ready|loading|error'

import config from 'libs/config'
import reactTools from 'libs/react-tools'

export default decl({

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

    this.state = {
      mode : 'loading',
      DEBUG : config.DEBUG,
    };
    // this.handleDoubleClick = this.handleDoubleClick.bind(this);
  },/*}}}*/

  /** componentWillMount ** {{{ */
  componentWillMount() {
    this.updateContent();
  },/*}}}*/

  /** componentDidMount ** {{{ */
  componentDidMount() {
    // DEBUG: Finding App component
    this.App = reactTools.findParentBlock(this, 'App');
    // console.log(config, this.App && this.App.testMethod());
  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      DEBUG : this.state.DEBUG,
      mode : this.state.mode,
    };
  },/*}}}*/

  /** loadFile ** {{{ Load file
   * @return {Promise}
   */
  loadFile() {
    // File url
    let url = this.props.url;
    // Start loading... (for dev server see webpack config & patch for loading `/site/` urls...)
    return axios.get(url)
      .then(res => {
        return res.data;
      }, this)
    ;
  },/*}}}*/

  /** updateContent ** {{{ */
  updateContent() {

    // Mode: loading
    this.setState({ mode : 'loading' });

    Promise.resolve(null)

    // Debugging delay...
    .then(() => this._delay(1000))

    // Loading file...
    .then(() => this.loadFile())

    // Processing data...
    .then(data => {
      this.setState({
        mode : 'ready',
        data : data,
      });
    }, this)

    // Error...
    .catch(err => {
      console.error(err);
      /*DEBUG*/debugger;
      this.setState({
        mode : 'error',
        error : err,
      });
    }, this)

    ;

  },/*}}}*/

  /** content ** {{{ */
  content() {

    return (
      <Fragment>
        {/* DEMO: comments, writing raw html... */}
        <span ref={(node) => { this._content = node; }} dangerouslySetInnerHTML={{ __html: '&gt;&lt;' }} />
      </Fragment>
    );

  },/*}}}*/

},
{
  /** propTypes ** {{{ */
  propTypes : {
    url : PropTypes.string,
    // data : PropTypes.string,
  },/*}}}*/
  /** defaultProps ** {{{ */
  defaultProps : {
    url : '/site/test/test.md',
    // data : '--NONE--',
  },/*}}}*/
});

