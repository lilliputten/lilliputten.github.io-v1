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

const config = {

  // Test mode?
  testMode : testMode,
  // Hot dev-server mode?
  hotMode : hotMode,
  // Development mode? (webpack server in hot mode)
  DEBUG : DEBUG,

  // Site content root url prefix
  siteRootPrefix : '/site',

  // App start time
  startTime : Date.now(), // ( DEBUG === 'test' ) ? 0 : Date.now(),

};

export default config;

