/**
 * @module View_clickHandle
 * @overview Working with page location hash
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.13, 01:30
 * @version 2018.03.20, 00:19
 */

import { declMod } from 'bem-react-core';

// import { setPage } from 'redux/actions/pageActions';
import reactTools from 'libs/reactTools';
import hashTools from 'libs/hashTools';
import jquery from 'jquery';

const _clickHandle_proto = /** @lends View_clickHandle.prototype */{

  block : 'View',

  /** willInit ** {{{ */
  willInit() {

    this.__base.apply(this, arguments);

    this._onLinkClick = this.onLinkClick.bind(this);

  },/*}}}*/

  /** componentWillUnmount ** {{{ */
  componentWillUnmount() {
    this.__base.apply(this, arguments);
    const links = this.getInternalLinks();
    links && links
      .off('click', this._onLinkClick)
    ;
  },/*}}}*/
  /** componentDidUpdate ** {{{ */
  componentDidUpdate() {
    this.__base.apply(this, arguments);
    this.onContentPlaced();
  },/*}}}*/

  /** onLinkClick ** {{{ Event on link clicked */
  onLinkClick(e) {

    // Try to get hash from link...
    const link = e.currentTarget;
    const url = reactTools.getRelativeUrl(link.href);
    const hash = hashTools.fromUrl(url);

    // If default hash, set empty
    if (hashTools.isDefaultHash(hash)) {
      hashTools.setToWindow('');
      return false;
    }

    // DEBUG
    console.log('View-Content:onLinkClick', link, '->', url, '->', hash);

    // If correct hash...
    if (hashTools.isCorrectHash(hash)) {
      // See hash handler in `:hashChange`
      hashTools.setToWindow(hash);
      return false;
    }

    return true;

  },/*}}}*/

  /** getInternalLinks ** {{{ Scan created content for link elements
   * @return {JQueryCollection}
   */
  getInternalLinks(){
    const domElem = this._wrapper || this;
    const dom = reactTools.getComponentDom(domElem);
    return dom && jquery(dom).find('a');
  },/*}}}*/

  /** onContentPlaced ** {{{ When content created or updated */
  onContentPlaced() {
    this.__base.apply(this, arguments);
    const links = this.getInternalLinks();
    links && links
      .off('click', this._onLinkClick)
      .on('click', this._onLinkClick)
    ;
  },/*}}}*/

}

export default declMod(function(){
  return this.props.clickHandle
}, _clickHandle_proto);
