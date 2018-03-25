/**
 * @module View
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.19, 02:53
 *
 * TODO:
 *
 *  - 2018.03.11, 04:42 -- Move pages loading & parsing to separate modules.
 *  - 2018.02.24, 03:22 -- Dynamically load file on state update.
 */

import { decl } from 'bem-react-core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// import config from 'config'

import 'm:mode=default|ready|loading|error'

import 'm:loadPage'
import 'm:hashChange'
import 'm:clickHandle'

const View_proto = /** @lends View.prototype */{

  block: 'View',

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      mode: this.state.mode,
    };
  },/*}}}*/

}

/** View_static ** {{{ */
const View_static = /* @lends View */{

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    page: PropTypes.string.isRequired,
  },

}/*}}}*/

const mapStateToProps = (state) => {
  const { page } = state.page || {};
  return { page };
}

export default decl(View_proto, View_static, connect(mapStateToProps));
// export default decl(View_proto, View_static);

