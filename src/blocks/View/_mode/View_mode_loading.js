import React from 'react'
import { declMod } from 'bem-react-core'
import { Bem } from 'bem-react-core';
// import TodoTextInput from './TodoTextInput'

export default declMod(function(){ return this.state.mode === 'loading' }, {

  block : 'View',

  content() {

    return (
      <Bem elem="Status" tag="p">
        Loading...
      </Bem>
    );

  },

});


