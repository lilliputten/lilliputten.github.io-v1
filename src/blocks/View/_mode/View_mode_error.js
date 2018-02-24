import React, { Fragment } from 'react';
import { declMod } from 'bem-react-core'
import { Bem } from 'bem-react-core';
// import TodoTextInput from './TodoTextInput'

export default declMod(function(){ return this.state.mode === 'error' }, {

  block : 'View',

  /** content ** {{{ */
  content() {

    const error = this.state.error.toString();

    return (
      <Fragment>
        <Bem elem="Error" tag="p">{error}</Bem>
        {/* DEMO: comments, writing raw html: <span dangerouslySetInnerHTML={{ __html: '&gt;&lt;' }} /> */}
      </Fragment>
    );

  },/*}}}*/

});


