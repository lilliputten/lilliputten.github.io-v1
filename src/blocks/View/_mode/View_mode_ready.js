import React, { Fragment } from 'react';
import { declMod } from 'bem-react-core'
import { Bem } from 'bem-react-core';
// import TodoTextInput from './TodoTextInput'

export default declMod(function(){ return this.state.mode === 'ready' }, {

  block : 'View',

  /** content ** {{{ */
  content() {

    const data = String(this.state.data).trim();
    return (
      <Fragment>
        <Bem ref={(node) => { this._content = node; }} elem="Content" tag="pre" dangerouslySetInnerHTML={{ __html: '&lt;' + data + '&gt;' }}></Bem>
        {/* DEMO: comments, writing raw html: <span dangerouslySetInnerHTML={{ __html: '&gt;&lt;' }} /> */}
      </Fragment>
    );

  },/*}}}*/

});


