/**
 * @module PageLoader
 * @overview Parse md-bases loaded pages
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 21:44
 * @version 2018.03.11, 21:44
 */

import inherit from 'inherit'
import config from 'config'
import fileLoader from 'libs/fileLoader'
import MdParser from 'libs/MdParser'
import hashTools from 'libs/hashTools'
import reactTools from 'libs/reactTools'
// import axios from 'axios'

const PageLoader_proto = /** @lends PageLoader.prototype */{

  /** __constructor ** {{{ */
  __constructor() {

    this.__base && this.__base(...arguments);

    // MD parser
    this.mdParser = new MdParser();

    // Pages cache
    this.pageCache = {};

  },/*}}}*/

  /** resolve ** {{{ Resolve page data
   * @param {String} pageId - Page id (in form `dir/file` for real file `/site/dir/file.md`)
   * @return {Promise(Object)} data
   * @return {Object} data.attributes - Page properties
   * @return {String} data.body - Raw markdown content
   * @return {String} data.html - Parsed markdown content
   */
  resolve(pageId) {

    if (this.pageCache[pageId]) {
      return Promise.resolve(this.pageCache[pageId]);
    }

    return this.load(pageId);

  },/*}}}*/

  /** load ** {{{ Load file from server
   * @param {String} pageId - Page id (in form `dir/file` for real file `/site/dir/file.md`)
   * @return {Object} data
   * @return {Object} data.attributes - Page properties
   * @return {String} data.body - Raw markdown content
   * @return {String} data.html - Parsed markdown content
   */
  load(pageId) {

    const url = hashTools.toUrl(pageId, config.site.defaultExt);

    return Promise.resolve(null)

      // Debugging delay...
      .then(() => reactTools.delay(300))

      // Loading file...
      .then(() => fileLoader.load(url))

      // Processing verified data...
      .then(body => {
        const html = this.mdParser.parse(body);
        const data = {
          body,
          html,
          attributes : {
            pageId
            // TODO: Fetch params from json file
          }
        };
        // Save data to cache
        this.pageCache[pageId] = data;
        // ...and resolve page data
        return data;
      })

      // Error...
      .catch(err => {
        console.error(err);
        /*DEBUG*/debugger;
        return Promise.reject(err);
      })

    ;

  },/*}}}*/

};

export default inherit(Object, PageLoader_proto);

