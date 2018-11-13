/**
 * @module css
 * @overview Export configuration for system styles
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.22, 23:39
 * @version 2018.03.22, 23:41
 */

const primaryColor = '#c10';
const defaultFontSize = 16;

/** cssVariables ** {{{ */
const cssVariables = {

  primaryColor,

  // DEBUG...

  testGlobalColor: 'orange', // test vatiable

  testViewportWidth: 300, // test media size

  // Fonts...

  defaultFontSize,
  fontSize: defaultFontSize,
  fontSizeSm: defaultFontSize - 2,
  fontSizeXs: defaultFontSize - 4,
  fontSizeLg: defaultFontSize + 2,
  fontSizeXl: defaultFontSize + 4,
  fontSizeXxl: defaultFontSize + 6,

  defaultFontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  defaultFontWeight: 400,
  defaultLineHeight: 1.5, // 1.5 ??? too loose? (from mdbootstrap)

  defaultTitleFontSize: 28,
  defaultTitleFontWeight: 300,

  // Page...

  pageBgColor: '#fff',

  defaultTextColor: '#333',
  defaultLinkColor: primaryColor,
  defaultHoveredLinkColor: '#f10',

  // Navbar...

  NavbarHeight: 50,

  NavBarTreshold: 600,

};/*}}}*/

// Using classic export due to requires in `config-override.js`
module.exports = cssVariables;
