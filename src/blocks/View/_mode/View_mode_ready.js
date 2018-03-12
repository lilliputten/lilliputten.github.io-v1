/**
 * @module View_mode_ready
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.13, 02:14
 */

import React, { Fragment } from 'react';
import { declMod/* , Bem */ } from 'bem-react-core'

import Content from 'e:Content'

const _mode_ready = /** @lends View_mode_ready.prototype */ {

  block : 'View',

  /** content ** {{{ */
  content() {

    return (
      <Fragment>
        <Content
          onLinkClick={this.onLinkClick.bind(this)}
          url={this.state.url}
          html={this.state.html}
          attributes={this.state.attributes}
        />
      </Fragment>
    );

  },/*}}}*/

}

export default declMod(function(){ return this.state.mode === 'ready' }, _mode_ready);


