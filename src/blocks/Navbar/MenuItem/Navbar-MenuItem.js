/**
 * @module Navbar-MenuItem
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.05.20 21:21
 * @version 2018.05.20 21:21
 */

import { decl } from 'bem-react-core';
// import React, { Fragment } from 'react';

const __MenuItem = /** @lends Navbar-MenuItem.prototype */ {

  block: 'Navbar',
  elem: 'MenuItem',

  tag: 'a',

  /** attrs ** {{{
   */
  attrs({url}) {
    return {
      href: url,
    };
  },/*}}}*/

  /** content ** {{{ */
  content() {
    return this.props.text;
  },/*}}}*/

}

export default decl(__MenuItem);
