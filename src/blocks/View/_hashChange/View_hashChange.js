/**
 * @module View_hashChange
 * @overview Working with page location hash
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.13, 01:30
 * @version 2018.03.20, 00:19
 */

import { declMod } from 'bem-react-core'
import hashTools from 'libs/hashTools'

import { setPage } from 'redux/actions/pageActions'

const _hashChange_proto = /** @lends View_hashChange.prototype */{

  block : 'View',

  /** handleHashChange ** {{{ Set pageId if hash changed */
  handleHashChange() {

    const hash = hashTools.getFromWindow();
    const pageId = hashTools.getPageId(hash);

    if (pageId != null) {
      this.props.dispatch(setPage(pageId));
    }

  },/*}}}*/

  /** componentDidMount ** {{{ */
  componentDidMount() {

    this.__base.apply(this, arguments);

    if (typeof window === 'object') {
      window.addEventListener('hashchange', this.handleHashChange.bind(this), false);
    }

  },/*}}}*/
  /** componentWillUnmount ** {{{ */
  componentWillUnmount() {

    this.__base.apply(this, arguments);

    if (typeof window === 'object') {
      window.removeEventListener('hashchange', this.handleHashChange, false);
    }

  },/*}}}*/

}

export default declMod(function(){
  return this.props.mods.hashChange
}, _hashChange_proto);
