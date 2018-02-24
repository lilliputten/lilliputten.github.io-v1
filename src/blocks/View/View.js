import React, { Fragment } from 'react';
import { decl } from 'bem-react-core';
// import { Bem } from 'bem-react-core';
import PropTypes from 'prop-types';

import axios from 'axios';

import 'm:mode=ready|loading|error';

// /*{{{ SAMPLE: Try to load local file (and detectig hot reload option from webpack)... */
//
// if ( false ) {
//   try {
//     let url = 'a.md';
//     debugger;
//     if ( module && module.hot && module.hot.active ) {
//       let moduleName = String(module.i).replace(/^\.[/\\]/, ''),
//         rootDepthRes = moduleName.match(/[/\\]/g),
//         rootDepth = rootDepthRes ? rootDepthRes.length : 0,
//         rootPrefix = '../'.repeat(rootDepth),
//         rootUrl = rootPrefix + url
//       ;
//       let x = require('../../a.md');
//       console.log(rootUrl, x);
//       // let x = require(rootUrl);
//     }
//     debugger;
//   }
//   catch(err) {
//     console.error(err);
//     debugger;
//   }
// }
//
// /*}}}*/
// /*{{{ SAMPLE: Testing url load: (+TODO) */
//
// // TODO: Check for loading in bundled version!
//
// let data = null;
// let url = '/site/a.md';
// // let url = '/server/site/a.md';
// // let url = 'https://lilliputten.github.io/images/Docs/pdf.gif';
// let getPromise = axios.get(url);
// getPromise
//   .then(function (response) {
//     data = response.data;
//     console.log('Loaded file:', response.data);
//   })
//   .catch(function (err) {
//     console.error(err);
//     debugger;
//   })
// ;
//
// /*}}}*/

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
    this.state = {
      mode : 'loading',
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
      mode : this.state.mode,
    };
  },/*}}}*/

  /** loadFile ** {{{ Load file
   * @return {Promise}
   */
  loadFile() {
    // File url (TODO: m.b., from state?)
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
    url : '/site/test/a.md',
    // data : '--NONE--',
  },/*}}}*/
});

