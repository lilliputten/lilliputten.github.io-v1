import React, { Fragment } from 'react';
// const ReactDOM = require('react-dom');
import { decl/* , Bem */ } from 'bem-react-core';

import Header from 'e:Header';
import View from 'b:View';

export default decl({

  block : 'App',

  /** willInit ** {{{ */
  willInit() {
    this.testMethod = this.testMethod.bind(this);
  },/*}}}*/

  /** testMethod ** {{{ */
  testMethod() {
    const result = 'testMethod';
    console.log(result);
    return result;
  },/*}}}*/

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        <Header/>
        {/*
        <Bem elem="Intro">
          To get started, edit <code>src/blocks/App/App.js</code> and save to reload.
        </Bem>
        <Bem block="View" mods={{m1:'v1'}}>
        </Bem>
        */}
        <View mods={{m1 : 'v1'}}>
        </View>
      </Fragment>
    );
  },/*}}}*/

});
