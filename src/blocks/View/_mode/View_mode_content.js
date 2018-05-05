/**
 * @module View_mode_content
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.26, 21:03
 */

import React, { Fragment } from 'react';
import { declMod } from 'bem-react-core';

import Content from 'e:Content';

const _mode_content = /** @lends View_mode_content.prototype */ {

  block : 'View',

  /** content ** {{{ */
  content() {

    return (
      <Fragment>
        <Content
          mode="content"
          rawhtml html={this.state.html}
          store={this.props.store}
          page={this.props.page}
          params={this.state.params}
        />
      </Fragment>
    );

  },/*}}}*/

}

export default declMod(function(){ return this.state && this.state.mode === 'content' }, _mode_content);

