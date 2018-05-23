/**
 * @module Navbar-Menu
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.26, 20:00
 * @version 2018.03.26, 20:58
 */

import React, { Fragment } from 'react';
import { decl/* , Bem */ } from 'bem-react-core';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

// import pageMapper from 'redux/mappers/pageMapper';

// import 'e:Logo';
// import 'e:MenuItem';

import config from 'config';

const mainMenu = config.site.mainMenu;

import MenuItem from 'e:MenuItem';

const __Menu_proto = /** @lends Navbar-Menu.prototype */{

  block: 'Navbar',
  elem: 'Menu',

  /** willInit ** {{{ */
  willInit() {

    // this.state = {
    //   mode: this.props.mode, // config.site.defaultMode,
    // };
    //
    // // Subscribe to store for page changing... (Correct redux method to update?)
    // this.props.store.subscribe(this.storeEvent.bind(this));

  },/*}}}*/

  // /** getPageState ** {{{ Page state object */
  // getPageState(){
  //
  //   const store = this.props.store;
  //   const state = store && store.getState();
  //   return state && state.page;
  //
  // },/*}}}*/
  // /** storeEvent ** {{{ Store state changed event */
  // storeEvent() {
  //   const pageState = this.getPageState();
  //   const mode = pageState.mode;
  //   this.setState({mode});
  // },/*}}}*/
  // /** mods ** {{{ Modifiers... */
  // mods(self) {
  //   const mode = this.state.mode;
  //   return {
  //     ...self.mods,
  //     mode,
  //   };
  // },/*}}}*/

  /** content ** {{{ */
  content() {
    const items = mainMenu.map(({url,text}) => ( <MenuItem key={url} url={url} text={text}/> ));
    return (
      <Fragment>
        {items}
      </Fragment>
    );
  },/*}}}*/

}

// /** __Menu_static ** {{{ */
// const __Menu_static = /** @lends Navbar-Menu */ {
//
//   propTypes: {
//     dispatch: PropTypes.func.isRequired,
//     mode: PropTypes.string.isRequired,
//     // page: PropTypes.string,
//   },
//
// }/*}}}*/

export default decl(__Menu_proto);

