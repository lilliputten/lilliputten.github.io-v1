/**
 * @module MdParser
 * @overview Parse md-bases loaded pages
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.11, 21:44
 * @version 2018.03.11, 21:44
 */

import inherit from 'inherit';

// import FrontMatter from 'front-matter';
import Markdown from 'markdown-it';

// [markdown-it/markdown-it](https://github.com/markdown-it/markdown-it)
// See also: [README](../../README.Resources.md)
import ExtraPlugin from 'libs/markdown/extra-tags-plugin';

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

      const parser = this.mdParser = Markdown({
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

      // Extending h1 titles (for animation purposes)...
      parser.renderer.rules.heading_open = (tokens, idx) => {
        const item = tokens[idx];
        const nextItem = tokens[idx + 1];
        // Trying to find parsed content...
        const content = (nextItem.children && nextItem.children[0] && nextItem.children[0].content) || nextItem.content;
        return '<' + item.tag + ' class="title title_' + item.tag + '"><div class="title-inset" data-text="' + parser.utils.escapeHtml(content) + '">';
      };
      parser.renderer.rules.heading_close = (tokens, idx) => {
        const item = tokens[idx];
        return '</div class="title-inset"></' + item.tag + '>';
      };

  },/*}}}*/

  /** parse ** {{{ Parse file content
   * @param {String} content - Expecting frontmatter+markdown format
   * @return {String} html
   */
  parse(content) {

    return this.mdParser.render(content);

  },/*}}}*/

};

export default inherit(Object, MdParser_proto);

