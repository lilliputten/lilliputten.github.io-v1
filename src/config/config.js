/**
 * @module config
 * @overview Application config
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.10, 02:05
 * @version 2018.03.10, 23:02
 */

// Submodules...

// Site properties
import site from './site'

// Postcss variables
import css from './css'

// Preused variables...

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

  // App start time (DEBUG?)
  startTime : Date.now(), // ( DEBUG === 'test' ) ? 0 : Date.now(),

  // Submodules...

  site,
  css,

};

export default config;

