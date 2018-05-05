/**
 * @module View_mode_default
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.19, 02:53
 */

import React, { Fragment } from 'react';
import { declMod } from 'bem-react-core';

import config from 'config';

import 'e:ContentWrapper';
// import ContentWrapper from 'e:ContentWrapper';

import Default from 'b:Default';

const _mode_default = /** @lends View_mode_default.prototype */ {

  block : 'View',

  /** content ** {{{ */
  content() {

    return (
      <Fragment>
        <Default mix={{ block: 'View', elem: 'ContentWrapper', mods: {mode: 'default'} }}>
          Root content <a href="#!test/test">test</a>
        </Default>
      </Fragment>
    );

  },/*}}}*/

}

export default declMod(function(){
  return !this.state || !this.state.mode || this.state.mode === config.site.defaultMode;
}, _mode_default);

