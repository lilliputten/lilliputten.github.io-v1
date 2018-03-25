/**
 * @module View_mode_default
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.19, 02:53
 */

import React, { Fragment } from 'react';
import { declMod/* , Bem */ } from 'bem-react-core'

// import Content from 'e:Content'
import ContentRaw from 'e:ContentRaw'

const _mode_default = /** @lends View_mode_default.prototype */ {

  block : 'View',

  /** content ** {{{ */
  content() {

    debugger;
    return (
      <Fragment>
        <ContentRaw
          store={this.props.store}
          html={this.state.html}
        />
      </Fragment>
    );

  },/*}}}*/

}

export default declMod(function(){
  return !this.state || !this.state.raw;
}, _mode_default);

