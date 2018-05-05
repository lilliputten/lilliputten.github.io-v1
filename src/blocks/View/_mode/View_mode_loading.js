import React from 'react';
import { declMod } from 'bem-react-core';
import { Bem } from 'bem-react-core';
import config from 'config';

export default declMod(function(){
  return this.state && this.state.mode === config.site.loadingMode
}, {

  block : 'View',

  content() {

    return (
      <Bem elem="ContentWrapper" mode="loading">
        <Bem ref={(node) => { this._content = node; }} elem="Status" tag="p">
          Loading...
        </Bem>
      </Bem>
    );

  },

});

