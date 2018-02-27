import React, { Fragment } from 'react';
import { decl } from 'bem-react-core';
// import { Bem } from 'bem-react-core';
import PropTypes from 'prop-types';

import axios from 'axios';

// import Button from 'b:Button';
// import Icon from 'b:Icon';

// import path from 'path';

import 'm:mode=ready|loading|error';

// TODO 2018.02.24, 03:22 -- Dynamically load file on state update.

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
    let hotLoad = !!( typeof module === 'object' && module.hot && module.hot.active );
    this.state = {
      mode : 'loading',
      hotLoad : hotLoad,
    };
    // this.handleDoubleClick = this.handleDoubleClick.bind(this);
  },/*}}}*/

  /** componentWillMount ** {{{ */
  componentWillMount() {
    this.updateContent();
  },/*}}}*/

  /** componentDidMount ** {{{ */
  componentDidMount() {
  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      hotLoad : this.state.hotLoad,
      mode : this.state.mode,
    };
  },/*}}}*/

  /** loadFile ** {{{ Load file
   * @return {Promise}
   */
  loadFile() {
    // File url
    let url = this.props.url; // '/site/a.md';
    // Start loading... (for dev derver see webpack config & patch for loading `/site/` urls...)
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
        <span dangerouslySetInnerHTML={{ __html: '&gt;&lt;' }} />
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

