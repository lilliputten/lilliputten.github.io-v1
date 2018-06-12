/**
 * @module Navbar-Logo
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.12, 01:29
 * @version 2018.03.26, 20:58
 */

import React, { Fragment } from 'react'
// import PropTypes from 'prop-types'
import { decl, Bem } from 'bem-react-core'

import logoSvg from './Logo.svg';

const __Logo_proto = /** @lends Navbar-Logo.prototype */ {

  block: 'Navbar',
  elem: 'Logo',

  // /** mods ** {{{ Modifiers... */
  // mods(self) {
  //   const mode = this.props.mode;
  //   return {
  //     ...self.mods,
  //     mode,
  //   };
  // },/*}}}*/

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        <Bem elem="LogoLink" tag="a" href="#!">
          <Bem elem="LogoImg" tag="img" src={logoSvg} alt="logo" />
        </Bem>
      </Fragment>
    );
  },/*}}}*/

}

export default decl(__Logo_proto);
