/**
 * @module PageLoader
 * @overview Load, parse & cache md-pages
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
   * @return {Object} data.data - Page properties
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
   * @return {Object} data.data - Page properties
   * @return {String} data.body - Raw markdown content
   * @return {String} data.html - Parsed markdown content
   */
  load(pageId) {

    const pageUrl = hashTools.toUrl(pageId, config.site.defaultExt);
    const paramsUrl = hashTools.toUrl(pageId, '.json');

    const pagePromise = fileLoader.load(pageUrl);
    const paramsPromise = fileLoader.load(paramsUrl);

    // Resulting page object
    let data = {
      params: {pageId, pageUrl, paramsUrl},
    };

    return new Promise((resolve, reject) => {

      // Use `all` for independent params load...
      // Don't use catching error for params file!
      Promise.all([paramsPromise, pagePromise])
        .then((args) => {
          const [params] = args;
          Object.assign(data.params, params);
        })
      ;

      // Load page data with failure control...
      pagePromise

        // DEBUG: Delay...
        .then((result) => reactTools.delay(300, result))

        // Processing loaded page...
        .then(body => {
          data.body = body;
          data.html = this.mdParser.parse(body);
          resolve(data);
        })

        // Error!
        .catch(err => {
          console.error(err);
          /*DEBUG*/debugger;
          reject(err);
        })

      ;

    })

      // Save data to cache on success...
      .then(() => {
        // Save data to cache
        this.pageCache[pageId] = data;
        return data;
      })

      // // Error!
      // .catch((err) => {
      //   console.error(err);
      //   /*DEBUG*/debugger;
      //   return Promise.reject(err);
      // })

    ;

  },/*}}}*/

};

export default inherit(Object, PageLoader_proto);

