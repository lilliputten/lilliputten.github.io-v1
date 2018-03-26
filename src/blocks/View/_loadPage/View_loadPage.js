/**
 * @module View_loadPage
 * @overview Working with page location hash
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.13, 01:30
 * @version 2018.03.26, 21:03
 */

import { declMod } from 'bem-react-core'

import config from 'config'
import PageLoader from 'libs/PageLoader'

const _loadPage_proto = /** @lends View_loadPage.prototype */{

  block : 'View',

  /** getPageState ** {{{ Page state object */
  getPageState(){

    const store = this.props.store;
    const state = store && store.getState();
    return state && state.page;

  },/*}}}*/

  /** willInit ** {{{ */
  willInit() {

    this.__base.apply(this, arguments);

    // Create page loader
    this.pageLoader = new PageLoader();

    const pageState = this.getPageState();

    // Initial state
    this.state = {...pageState};

    // Subscribe to store for page changing... (Correct redux method to update?)
    this.props.store.subscribe(this.storeEvent.bind(this));

  },/*}}}*/

  /** storeEvent ** {{{ Store state changed event */
  storeEvent() {
    const pageState = this.getPageState();
    const page = pageState.page || config.site.defaultPage;
    this.placePage(page);
  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      mode: this.state.mode,
    };
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
   * @param {String} [page] - Page id
   * @return {Promise}
   */
  loadPage(page) {
    return this.pageLoader.resolve(page)
      // Set page data...
      .then(data => {
        this.setState({
          page: page,
          mode: 'content',
          params: data.params,
          html: data.html,
        });
        return data;
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
    const promise = isDefault ? this.defaultPage(page) : this.loadPage(page);

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

