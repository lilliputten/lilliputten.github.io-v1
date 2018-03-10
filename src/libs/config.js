/**
 * @module react-tools
 * @overview Application config
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.10, 02:05
 * @version 2018.03.10, 03:56
 */

let config = {

  // Development mode? (webpack server in hot mode)
  devMode : typeof module === 'object' && module.hot && module.hot.active,

  // App start time
  startTime : Date.now(),

};

export default config;

