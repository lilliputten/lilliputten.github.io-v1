/**
 * @module config
 * @overview Application config
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.10, 02:05
 * @version 2018.03.10, 23:02
 */

const testMode = (typeof jest === 'object');
const hotMode = !!(typeof module === 'object' && module.hot && module.hot.active);
const DEBUG = testMode ? 'test' : hotMode;

const config = /** @lends config */{

  /** Is test mode? */
  testMode : testMode,
  /** Is hot dev-server mode? */
  hotMode : hotMode,
  /** Is DEBUG mode? (webpack server in hot mode) */
  DEBUG : DEBUG,

  /** Site properties */
  site : {

    /** Site content root url prefix */
    rootPrefix : '/site',

    /** Default site folder index (if url like `/some/folder/`) */
    defaultIndex : 'index',

    /** Default site page extension */
    defaultExtension : '.md',

    /** Default site extensions to strip from url */
    defaultExtensions : ['.md', '.json'],

  },

  // App start time
  startTime : Date.now(), // ( DEBUG === 'test' ) ? 0 : Date.now(),

};

export default config;

