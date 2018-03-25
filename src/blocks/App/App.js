/**
 * @module App
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.01.28, 23:51
 * @version 2018.03.25, 07:13
 */

import React, { Fragment } from 'react'
import { decl/* , Bem */ } from 'bem-react-core'
import { connect } from 'react-redux'
import hashTools from 'libs/hashTools'

import config from 'config'

import Header from 'e:Header'
import View from 'b:View'

const App_proto = /** @lends App.prototype */{

  block: 'App',

  /** willInit ** {{{ */
  willInit() {

    const hash = hashTools.getFromWindow();
    const page = hashTools.getPageId(hash) || config.site.defaultPage;

    this.state = {
      page,
    };

    this.props.store && this.props.store.subscribe(() => {
      const state = this.props.store.getState();
      const page = state.page.page;
      this.setState({
        page,
      });
    });

  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    const page = this.state.page;
    return { ...self.mods,
      page,
    };
  },/*}}}*/

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        <Header/>
        <View loadPage hashChange clickHandle store={this.props.store} />
      </Fragment>
    );
  },/*}}}*/

};

const mapStateToProps = (state) => {
  const { page } = state.page || {};
  return { page };
}

export default decl(App_proto, connect(mapStateToProps));

