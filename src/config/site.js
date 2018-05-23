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
  defaultMode: 'default',
  contentMode: 'content',
  loadingMode: 'loading',

  // To load page data (usually smth like `*.json`)
  loadPageParams: false,

  /** mainMenu ** {{{
   */
  mainMenu: [
    { url: '#!about', text: 'About' },
    { url: '#!contacts', text: 'Contacts' },
  ],/*}}}*/

};

export default config_site;

