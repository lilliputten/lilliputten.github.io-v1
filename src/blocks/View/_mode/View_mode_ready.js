import React, { Fragment } from 'react';
import { declMod/* , Bem */ } from 'bem-react-core'

import Content from 'e:Content'

export default declMod(function(){ return this.state.mode === 'ready' }, {

  block : 'View',

  /** content ** {{{ */
  content() {

    return (
      <Fragment>
        <Content
          changeUrl={this.changeUrl.bind(this)}
          url={this.state.url}
          html={this.state.html}
          attributes={this.state.attributes}
        />
      </Fragment>
    );

  },/*}}}*/

});


