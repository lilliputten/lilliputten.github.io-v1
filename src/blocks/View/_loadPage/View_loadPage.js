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
    this.setState({ mode: config.site.loadingMode });

    // First delay -> loading...
    let promises = [reactTools.delay(config.site.loadingDelay, {status: 'loading'})];

    // // DEBUG
    // console.log('View:placePage', page);
    // debugger;

    if ( !isDefault ) {
      // Load or fetch cached page content
      promises.push(this.pageLoader.resolve(page));
    }

    // Wait for delay and load/fetch content for regular pages...
    const resultPromise = Promise.all(promises)

      // Successful loading...
      .then(([delayResult, data]) => {

        // If regular page...
        if ( !isDefault && data ) {
          this.setState({
            page: page,
            mode: config.site.contentMode,
            params: data.params,
            html: data.html,
          });
          return {status: config.site.contentMode, ...data, page};
        }
        // ...Else if main (default) page...
        else {
          this.setState({
            page: page,
            mode: config.site.defaultMode,
          });
          return {status: config.site.defaultMode, page};
        }

      })

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

    return resultPromise;

  },/*}}}*/

}

export default declMod(function(){
  return this.props.loadPage
}, _loadPage_proto);

