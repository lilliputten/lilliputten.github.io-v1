/**
 * @module View
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.02.26, 02:42
 * @version 2018.03.26, 21:03
 */

import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import pageMapper from 'redux/mappers/pageMapper';

// import config from 'config';

import 'm:mode=default|content|loading|error';

import 'm:loadPage';
import 'm:hashChange';
import 'm:clickHandle';

const View_proto = /** @lends View.prototype */{

  block: 'View',

}

/** View_static ** {{{ */
const View_static = /* @lends View */{

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    page: PropTypes.string.isRequired,
    // status: PropTypes.string.isRequired,
  },

}/*}}}*/

export default decl(View_proto, View_static, connect(pageMapper));

