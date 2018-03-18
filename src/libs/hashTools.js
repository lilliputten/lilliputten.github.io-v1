/**
 * @module hashTools
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 20:32
 * @version 2018.03.11, 20:32
 */

import config from 'config'

const hashTools = {

  /** getFromWindow ** {{{ */
  getFromWindow : function () {
    return ( typeof window === 'object' && window.location && window.location.hash ) || '';
  },/*}}}*/

  /** getPageIdFromWindow ** {{{ Get page id from window location hash
   * @return {String}
   */
  getPageIdFromWindow : function () {
    const hash = this.getFromWindow();
    if ( this.isCorrectHash(hash) ) {
      return this.getPageId(hash);
    }
    return '';
  },/*}}}*/

  /** isCorrecthash ** {{{ Check for correct hash value (empty or in form `#!string/hash`)
   * @param {String} hash
   * @return {Boolean}
   */
  isCorrectHash : function (hash) {

    return !!( hash != null && ( hash === '' || hash.startsWith('#!') || hash.startsWith('#') ) );

  },/*}}}*/

  /** toPageId ** {{{ Convert hash to page id (w/o root & extension)
   * @param {String} hash
   * @return {String} pageId
   */
  toPageId : function (hash) {

    // Strip leading '#!'
    if (hash.startsWith('#')) {
      hash = hash.substr(1);
    }
    // ??
    if (hash.startsWith('!')) {
      hash = hash.substr(1);
    }
    // ???
    if (hash.startsWith('/')) {
      hash = hash.substr(1);
    }

    return hash;

  },/*}}}*/

  /** toUrl ** {{{ Convert hash to base url (w/o extension)
   * @param {String} hash
   * @param {String} [extension]
   * @return {String} url
   */
  toUrl : function (hash, extension) {

    let page = this.toPageId(hash);

    // Adding leading slash
    if (!page.startsWith('/')) {
      page = '/' + page;
    }

    // Adding index if ends with '/'
    if (page.endsWith('/')) {
      page += config.site.defaultIndex;
    }

    // Adding extension
    if (extension) {
      page += extension;
    }

    return config.site.rootPrefix + page;

  },/*}}}*/

  /** fromUrl ** {{{ Convert url to hash
   * @param {String} url
   * @return {String} hash
   */
  fromUrl : function (url) {

    // Removing default extensions and index
    const stripAtEnd = config.site.defaultExts.concat(config.site.defaultIndex);
    stripAtEnd.map((tail) => {
      if (url.endsWith(tail)) {
        url = url.substr(0, url.length - tail.length);
      }
      return url;
    });

    // Removing root prefix
    if (url.startsWith(config.site.rootPrefix)) {
      url = url.substr(config.site.rootPrefix.length);
    }

    // Removing leading slash
    if (url.startsWith('/')) {
      url = url.substr(1);
    }

    return url && '#!' + url;

  },/*}}}*/

  /** getPageId ** {{{ Get page id from hash/url
   * @param {String} urlOrHash - Hash (#!/dir/page) or url (<rootPrefix>/dire/page)
   * @return {null|String) - Return null if can't fing page id.
   */
  getPageId : function (urlOrHash) {

    if (urlOrHash != null) {
      if (urlOrHash.startsWith(config.site.rootPrefix)) {
        urlOrHash = this.fromUrl(urlOrHash);
      }
      if (this.isCorrectHash(urlOrHash)) {
        return this.toPageId(urlOrHash);
      }
    }

    return null;

  },/*}}}*/

};

export default hashTools;


