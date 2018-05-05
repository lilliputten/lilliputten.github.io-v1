/**
 * @module fileLoader
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 20:32
 * @version 2018.03.11, 20:32
 */

import axios from 'axios';

const fileLoader = {

  /** getOptionsObject ** {{{ Get options hash from url
   * @param {String|Object} url
   * @return {Object}
   */
  getOptionsObject : function(url){

    if ( typeof url === 'string' ) {
      url = { url };
    }

    return url;

  },/*}}}*/

  /** check ** {{{ Check url or options
   * @param {String|Object} url - Request url or options
   * @return {Promise}
   */
  check : function (url) {

    // Create `HEAD` request data
    const options = Object.assign({}, this.getOptionsObject(url), { method : 'HEAD' });

    // Make request
    return axios(options);

  },/*}}}*/

  /** load ** {{{ Load file from url or options
   * @param {String|Object} url
   * @param {Object} [options] - Paramters
   * @param {Truthy} [options.skipCheck] - Skip check prefetch.
   * @return {Promise}
   */
  load : function (url, options={}) {

    // Create universal opts object from url
    const opts = this.getOptionsObject(url);

    // skipCheck = config.site.skipPageParams

    // Make request
    return ( options.skipCheck ? Promise.resolve('skipCheck') : this.check(opts) )
      .then(res => axios(opts))
      .then(res => res.data)
    ;

  },/*}}}*/

};

export default fileLoader;

