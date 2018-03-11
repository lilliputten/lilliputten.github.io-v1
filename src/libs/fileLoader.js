/**
 * @module fileLoader
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 20:32
 * @version 2018.03.11, 20:32
 */

import axios from 'axios'

const fileLoader = {

  /** load ** {{{ Load file from url
   * @param {String} url
   * @return {Promise}
   */
  load : function (url) {

    // Start loading... (for dev server see webpack config & patch for loading `/site/` urls...)
    return axios.get(url)
      .then(res => {
        return res.data;
      }, this)
    ;

  },/*}}}*/

};

export default fileLoader;

