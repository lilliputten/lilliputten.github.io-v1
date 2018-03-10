import React, { Fragment } from 'react'
// const ReactDOM = require('react-dom')
import { decl/* , Bem */ } from 'bem-react-core'

import Header from 'e:Header'
import View from 'b:View'

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
        <View mods={{m1 : 'v1'}}>
        </View>
      </Fragment>
    );
  },/*}}}*/

});
