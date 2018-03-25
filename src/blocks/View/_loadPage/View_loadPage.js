/**
 * @module View_loadPage
 * @overview Working with page location hash
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.13, 01:30
 * @version 2018.03.20, 00:19
 */

import { declMod } from 'bem-react-core'

import config from 'config'
import PageLoader from 'libs/PageLoader'

const _loadPage_proto = /** @lends View_loadPage.prototype */{

  block : 'View',

  /** willInit ** {{{ */
  willInit() {

    this.__base.apply(this, arguments);

    // Create page loader
    this.pageLoader = new PageLoader();

    // Default or custom page?
    const isDefault = (this.props.page === config.site.defaultPage);
    this.state = {
      mode: isDefault ? config.site.defaultMode : config.site.loadingMode,
    };

    // ??? Subscribe to store for page changing... (Correct redux method to update?)
    this.props.store.subscribe(() => {
      const state = this.props.store.getState();
      const page = state.page.page || config.site.defaultPage;
      this.placePage(page);
    });

  },/*}}}*/

  /** defaultPage ** {{{ Place default page
   * @param {String} [page] - Url to show
   * @return {Promise}
   */
  defaultPage(page) {
    this.setState({
      page: page,
      mode: config.site.defaultMode,
    });
    return Promise.resolve({status: 'defaultPage', page});
  },/*}}}*/

  /** loadPage ** {{{ Load custom page
   * @param {String} [page] - Url to show
   * @return {Promise}
   */
  loadPage(page) {
    return this.pageLoader.resolve(page)
      // Set page data...
      .then(data => {
        this.setState({
          page: page,
          mode: 'ready',
          attributes: data.attributes,
          html: data.html,
        });
        return {status: 'pageLoaded', page, data};
      })
    ;
  },/*}}}*/

  /** placePage ** {{{ Update page content on url changing
   * @param {String} [page] - Url to show
   * @return {Promise}
   */
  placePage(page) {

    if (page == null ) {
      page = this.props.page; // page || config.site.defaultPage;
    }

    // Mode: loading
    this.setState({ mode: config.site.loadingMode });

    // DEBUG
    console.log('View:placePage', page);

    const isDefault = (page === config.site.defaultPage);
    const promise = isDefault ? this.defaultPage(page):
                                          this.loadPage(page);

    // Load or resolve page data...
    promise

      // DEBUG!
      // .then(data => {
      //   debugger;
      //   return data;
      // })

      // Error...
      .catch(err => {
        console.error(err);
        /*DEBUG*/debugger;
        this.setState({
          mode: 'error',
          error: err,
        });
      })
    ;

  },/*}}}*/

}

export default declMod(function(){
  return this.props.loadPage
}, _loadPage_proto);

