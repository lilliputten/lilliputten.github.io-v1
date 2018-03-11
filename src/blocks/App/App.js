/**
 * @module App
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.01.28, 23:51
 * @version 2018.03.11, 04:42
 */
import React, { Fragment } from 'react'
import { decl/* , Bem */ } from 'bem-react-core'

// import config from 'libs/config'
// import reactTools from 'libs/reactTools'

import Header from 'e:Header'
import View from 'b:View'

export default decl({

  block : 'App',

  /** willInit ** {{{ */
  willInit() {
    this.testMethod = this.testMethod.bind(this);
  },/*}}}*/

  /** componentDidMount ** {{{ */
  componentDidMount() {
    // DEBUG: Finding View component
    // this.View = reactTools.findChildBlock(this, 'View');
    // console.log(config, this.View);
  },/*}}}*/

  /** testMethod ** {{{ DEBUG! */
  testMethod() {
    const result = 'testMethod';
    // console.log(result);
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
