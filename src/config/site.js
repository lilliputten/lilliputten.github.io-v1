/**
 * @module config.site
 * @overview Site config
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.18, 22:10
 * @version 2018.03.18, 22:10
 */

const config_site = /** @lends config.site */ {

  /** Site content root url prefix */
  rootPrefix: '/site',

  /** Default site folder index (if url like `/some/folder/`) */
  defaultIndex: 'index',

  /** Default site page extension */
  defaultExt: '.md',

  /** Default page params file extension */
  dataExt: '.json',

  /** Default site extensions to strip from url */
  defaultExts: ['.md', '.json'],

  defaultPage: 'default',

  // Default modes...
  initialMode: 'initial',
  defaultMode: 'default',
  contentMode: 'content',
  loadingMode: 'loading',
  errorMode: 'error',
  // unloadingMode: 'unloading',

  emptyStatus: 'empty',
  loadingStatus: 'loading',
  readyStatus: 'ready',
  // errorStatus: 'error',

  // Page loading delay (ms)
  loadingDelay: 0,

  // To load page data (usually smth like `*.json`)
  loadPageParams: false,

  /** mainMenu ** {{{
   */
  mainMenu: [
    // { url: '#!error', text: 'Error' },
    { url: '#!About', text: 'About' },
    { url: '#!Projects/', text: 'Projects' },
    { url: '#!Contacts', text: 'Contacts' },
  ],/*}}}*/

};

export default config_site;

