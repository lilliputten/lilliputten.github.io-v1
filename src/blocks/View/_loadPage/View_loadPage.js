/**
 * @module View_loadPage
 * @overview Working with page location hash
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.13, 01:30
 * @version 2018.03.26, 21:03
 */

import { declMod } from 'bem-react-core';

import config from 'config';
import PageLoader from 'libs/PageLoader';
import reactTools from 'libs/reactTools';

import { setStatus } from 'redux/actions/pageActions';

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

  /** mods ** {{{ Modifiers... */
  mods(self) {
    return { ...self.mods,
      mode: this.state.mode,
      status: this.state.status,
    };
  },/*}}}*/

  /** storeEvent ** {{{ Store state changed event */
  storeEvent() {

    const pageState = this.getPageState();
    const page = pageState.page || config.site.defaultPage;
    // const mode = pageState.mode;
    const status = pageState.status;

    // Set status
    this.setState({status});

    // If another page & not loading...
    if (page !== this.state.loadedPage && status !== config.site.loadingStatus) {
      // ...place page...
      this.placePage(page);
    }

  },/*}}}*/

  /** placePage ** {{{ Update page content on url changing
   * @param {String} [page] - Url to show
   * @return {Promise}
   */
  placePage(page) {

    if (page == null ) {
      page = this.props.page; // page || config.site.defaultPage;
    }

    const isDefault = (page === config.site.defaultPage);

    // Mode: loading
    this.setState({mode: config.site.loadingMode, status: config.site.loadingStatus});

    // First delay -> loading...
    let promises = [reactTools.delay(config.site.loadingDelay, {status: 'loading'})];

    if ( !isDefault ) {
      // Load or fetch cached page content
      promises.push(this.pageLoader.resolve(page));
    }

    this.props.dispatch(setStatus(config.site.loadingStatus));

    // Wait for delay and load/fetch content for regular pages...
    const resultPromise = Promise.all(promises)

      // Successful loading...
      .then(([delayResult, data]) => {

        // If regular page...
        if ( !isDefault && data ) {
          this.setState({
            page: page,
            loadedPage: page,
            mode: config.site.contentMode,
            // status: config.site.readyStatus,
            params: data.params,
            html: data.html,
          });
          return {status: config.site.contentMode, ...data, page};
        }
        // ...Else if main (default) page...
        else {
          this.setState({
            page: page,
            loadedPage: page,
            mode: config.site.defaultMode,
            // status: config.site.readyStatus,
          });
          return {status: config.site.defaultMode, page};
        }

      })

      // Error...
      .catch(err => {
        console.error(err);
        /*DEBUG*/debugger;
        this.setState({
          page: page,
          loadedPage: page,
          mode: config.site.errorMode,
          status: config.site.readyStatus,
          error: err,
        });
      })

      .finally(() => {
        this.props.dispatch(setStatus(config.site.readyStatus));
      })

    ;

    return resultPromise;

  },/*}}}*/

}

export default declMod(function(){
  return this.props.loadPage
}, _loadPage_proto);

