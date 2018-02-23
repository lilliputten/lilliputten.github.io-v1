import React, { Fragment } from 'react';
import { decl, Bem } from 'bem-react-core';

// import Title from 'e:Title';

export default decl({

  block: 'Test',

  // content: 'zzz',

  // content() {
  //   return [
  //     this.__base(...arguments),
  //     (<Bem tag="span">
  //       Test
  //     </Bem>),
  //     // '0',
  //     // 'zzz',
  //   ];
  // },

  content() {
    return (
      <Fragment>
        <Bem elem="Title" tag="p">Welcome to React</Bem>
      </Fragment>
    );
  },

  // content() {
  //   return (
  //     <Fragment>
  //       <Bem tag="span">
  //         Test
  //       </Bem>
  //     </Fragment>
  //   );
  // },

});

