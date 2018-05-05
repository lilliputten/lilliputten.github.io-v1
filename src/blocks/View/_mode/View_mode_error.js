import React, { Fragment } from 'react';
import { declMod } from 'bem-react-core';
import { Bem } from 'bem-react-core';

export default declMod(function(){ return this.state && this.state.mode === 'error' }, {

  block : 'View',

  /** content ** {{{ */
  content() {

    const error = this.state.error.toString();

    return (
      <Fragment>
        <Bem elem="ContentWrapper" mode="error">
          <Bem ref={(node) => { this._content = node; }} elem="Error" tag="p">{error}</Bem>
        </Bem>
      </Fragment>
    );

  },/*}}}*/

});


