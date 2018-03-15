/**
 * @module hashTools
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 20:32
 * @version 2018.03.11, 20:32
 */

import config from 'libs/config'

const hashTools = {

  /** toUrl ** {{{ Convert hash to base url (w/o extension)
   * @param {String} hash
   * @return {String} url
   */
  toUrl : function (hash) {

    // Strip leading '#!'
    if (hash.startsWith('#')) {
      hash = hash.substr(1);
    }
    if (hash.startsWith('!')) {
      hash = hash.substr(1);
    }

    // Adding leading slash
    if (!hash.startsWith('/')) {
      hash = '/' + hash;
    }

    // Adding index if ends with '/'
    if (hash.endsWith('/')) {
      hash += config.site.defaultIndex;
    }

    return config.site.rootPrefix + hash;

  },/*}}}*/

  /** fromUrl ** {{{ Convert url to hash
   * @param {String} url
   * @return {String} hash
   */
  fromUrl : function (url) {

    // Removing default extensions and index
    const stripAtEnd = config.site.defaultExtensions.concat(config.site.defaultIndex);
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

};

export default hashTools;


