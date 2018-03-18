/**
 * @module MdParser
 * @overview Parse md-bases loaded pages
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 21:44
 * @version 2018.03.11, 21:44
 */

import inherit from 'inherit'

// import FrontMatter from 'front-matter'
import Markdown from 'markdown-it'

import ExtraPlugin from 'libs/markdown/extra-tags-plugin'

// var hljs = require('highlight.js'); // https://highlightjs.org/
// var hljsPlugin = require('markdown-it-highlight').default;

// TODO: Create parsers for custom tags...
var extraPlugin = new ExtraPlugin((content, utils) => {
  var extra = utils.escape(content);
  return '<span class="extraTag">'
     + '--' + extra + '--'
     + '</span>'
  ;
});

const MdParser_proto = /** @lends MdParser.prototype */{

  /** __constructor ** {{{ */
  __constructor() {

      this.__base && this.__base(...arguments);

      this.mdParser = Markdown({
          typographer : true,
          quotes : '«»‘’',
          // highlight: function (str, lang) {
          //   if (lang && hljs.getLanguage(lang)) {
          //     try {
          //       return hljs.highlight(lang, str).value;
          //     } catch (err) {}
          //   }
          //   return ''; // use external default escaping
          // },
        })
        .use(extraPlugin)
      ;

  },/*}}}*/

  /** parse ** {{{ Parse file content
   * @param {String} content - Expecting frontmatter+markdown format
   * @return {Object} data
   * @return {Object} data.attributes - Frontmatter properties
   * @return {String} data.body - Raw markdown content
   * @return {String} data.html - Parsed markdown content
   */
  parse(content) {

    return this.mdParser.render(content);

  },/*}}}*/

};

export default inherit(Object, MdParser_proto);

