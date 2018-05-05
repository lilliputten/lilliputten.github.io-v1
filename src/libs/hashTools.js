/**
 * @module hashTools
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 20:32
 * @version 2018.03.11, 20:32
 */

import config from 'config';

const hashTools = {

  /** getFromWindow ** {{{ Get hash from window location */
  getFromWindow : function () {
    return ( typeof window === 'object' && window.location && window.location.hash ) || '';
  },/*}}}*/

  /** setToWindow ** {{{ Set hash to window location
   * @param {String} hash
   */
  setToWindow : function (hash) {
    if ( typeof window === 'object' && window.location ) {
      window.location.hash = hash;
    }
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

    let hash = url;

    // Hash at root url
    if (hash.startsWith('/#!')) {
      return hash.substr(1);
    }

    // Removing default extensions and index
    const stripAtEnd = config.site.defaultExts.concat(config.site.defaultIndex);
    stripAtEnd.map((tail) => {
      if (hash.endsWith(tail)) {
        hash = hash.substr(0, hash.length - tail.length);
      }
      return hash;
    });

    // Removing root prefix
    let found = false;
    if (hash.startsWith(config.site.rootPrefix)) {
      hash = hash.substr(config.site.rootPrefix.length);
      found = true;
    }
    // Removing leading slash
    if (hash.startsWith('/')) {
      hash = hash.substr(1);
      found = true;
    }
    // Invalid url
    if (!found) {
      return null;
    }

    if (this.isCorrectHash(hash)){
      hash = this.toPageId(hash);
    }

    // Return empty value if default page
    if (hash === config.site.defaultPage) {
      hash = '';
    }

    return hash && '#!' + hash;

  },/*}}}*/

  /** getPageId ** {{{ Get page id from hash/url
   * @param {String} urlOrHash - Hash (#!/dir/page) or url (<rootPrefix>/dire/page)
   * NOTE: Highest level method on `toPageId`.
   * @return {null|String) - Return null if can't fing page id.
   */
  getPageId : function (urlOrHash) {

    if (urlOrHash == null) {
      return null;
    }
    else if (urlOrHash === '') {
      return config.site.defaultPage;
    }
    else {
      if (urlOrHash.startsWith(config.site.rootPrefix)) {
        urlOrHash = this.fromUrl(urlOrHash);
      }
      if (this.isCorrectHash(urlOrHash)) {
        const pageId = this.toPageId(urlOrHash);
        if (!pageId || pageId === config.site.defaultPage) {
          return '';
        }
        return pageId;
      }
    }

    return null;

  },/*}}}*/

  /** fromPageId ** {{{ Get hash for pageId
   * @param {String} pageId
   * @return {String} hash
   */
  fromPageId : function (pageId) {
    return '#!' + pageId;
  },/*}}}*/

  /** isDefaultHash ** {{{ Is hash for default page?
   * @param {String} hash - Hash (#!/dir/page)
   * @return {Boolean}
   */
  isDefaultHash : function (hash) {
    return hash === this.fromPageId(config.site.defaultPage);
  },/*}}}*/

};

export default hashTools;


