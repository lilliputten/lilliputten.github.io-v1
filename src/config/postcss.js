/**
 * @module postcss
 * @overview Export configuration for system styles
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.22, 23:39
 * @version 2018.03.22, 23:41
 */

const css = require('./css');

/** size ** {{{ Convert js numbers to css dimensions
 * @param {*} v
 * @return {String}
 */
function size (v) {
  if ( typeof v === 'number' || !isNaN(v) ) {
    v = String(v) + 'px';
  }
  return String(v);
}/*}}}*/

/** cssFeatures ** {{{ `postcss-cssnext` features object. See `config-overrides.js` */
const cssFeatures = {

  // https://github.com/postcss/postcss-custom-properties
  customProperties: {

    warnings: false, // https://github.com/postcss/postcss-custom-properties#warnings
    // noValueNotifications: true, // https://github.com/postcss/postcss-custom-properties#warnings
    // appendVariables: true, // https://github.com/postcss/postcss-custom-properties#appendvariables
    // preserve: true, // DONTUSE!!! // https://github.com/postcss/postcss-custom-properties#preserve

    variables : Object.keys(css).reduce((result, key) => {
      result[key] = size(css[key]);
      return result;
    }, {}),

  },

  // https://github.com/postcss/postcss-custom-media
  customMedia: {
    extensions: {

      testViewport: '(min-width: ' + size(css.testViewportWidth) + ')',

    },
  },

};/*}}}*/

module.exports = {
  cssnextFeatures : cssFeatures,
};
