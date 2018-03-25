/**
 * @module View_hashChange
 * @overview Working with page location hash
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.13, 01:30
 * @version 2018.03.20, 00:19
 */

import { declMod } from 'bem-react-core'
import hashTools from 'libs/hashTools'
import config from 'config'

import { setPage } from 'redux/actions/pageActions'

const _hashChange_proto = /** @lends View_hashChange.prototype */{

  block : 'View',

  /** componentWillMount ** {{{ */
  componentWillMount() {

    this.__base.apply(this, arguments);

    this.handleHashChange();

  },/*}}}*/

  /** handleHashChange ** {{{ Set page if hash changed */
  handleHashChange() {

    const hash = hashTools.getFromWindow();
    const page = hashTools.getPageId(hash) || config.site.defaultPage;

    // DEBUG
    console.log('View:hashChange:handleHashChange', hash, '->', page);

    if (page != null) {
      this.props.dispatch(setPage(page));
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
  return this.props.hashChange
}, _hashChange_proto);
