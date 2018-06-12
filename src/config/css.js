/**
 * @module css
 * @overview Export configuration for system styles
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.22, 23:39
 * @version 2018.03.22, 23:41
 */

/** cssVariables ** {{{ */
const cssVariables = {

  // DEBUG...

  testGlobalColor: 'orange', // test vatiable

  testViewportWidth: 300, // test media size

  // Fonts...

  baseFontSize: 14,

  baseFontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',

  // Page...

  pageBgColor: '#fff',

  defaultTextColor: '#333',
  defaultLinkColor: '#c10',
  defaultHoveredLinkColor: '#f10',

  // Navbar...

  NavbarHeight: 50,

};/*}}}*/

// Using classic export due to requires in `config-override.js`
module.exports = cssVariables;
