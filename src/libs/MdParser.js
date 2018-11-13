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

import yaml from 'js-yaml';

import config from 'config';

// [markdown-it/markdown-it](https://github.com/markdown-it/markdown-it)
// See also: [README](../../README.Resources.md)
import ExtraPluginCreator from 'libs/markdown/extra-tags-plugin';

// import attrsPlugin from 'markdown-it-attrs';
import decoratePlugin from 'markdown-it-decorate';

// var hljs = require('highlight.js'); // https://highlightjs.org/
// var hljsPlugin = require('markdown-it-highlight').default;

/** parseExtraGallery ** {{{ Parse gallery items
 * @param {Object} extra
 * @param {Object} extra.data
 * @param {Object[]} extra.data.items
 * @param {String} extra.data.items[].url
 * @param {String} extra.data.items[].caption
 * @return {String}
 */
function parseExtraGallery (extra) {
  const items = extra && extra.data && extra.data.items;
  if (Array.isArray(items)) {
    extra.content = items.map((item)=>{
      const url = (typeof item === 'string') ? item : item.url;
      const thumbUrl = config.site.galleryThumbMask.replace(/{url}/, url);
      const imageUrl = config.site.galleryImageMask.replace(/{url}/, url);
      const title = item.title || '';
      return `<a data-fancybox="${extra.id}" href="${imageUrl}" data-caption="${title}" title="${title}"><img src="${thumbUrl}" alt="${title}" /></a>`;
    }).join('\n');
  }
}/*}}}*/

// TODO: Create parsers for custom tags...
var extraPlugin = new ExtraPluginCreator((content, utils) => {
  const match = content.match(/^\s*@(\S+?)\b(?:[:](\S+))?\b([\S\s]*)$/m);
  let extra = {
    content: content,
    type: 'extra',
    tag: 'span',
    // id: '',
  };
  if ( match) {
    content = match[3];
    Object.assign(extra, {
      type: match[1],
      id: match[2],
      content: content.trim(),
    });
  }
  // Check for parseable types...
  if (extra.type === 'icon') {
    extra.type = 'fa fa-' + extra.id;
    if (extra.content) {
      extra.type += ' ' + extra.content;
    }
    extra.content = '';
    extra.id = '';
  }
  else if (extra.type === 'gallery') {
    extra.data = yaml.safeLoad(content);
    if (extra.type === 'gallery') {
      parseExtraGallery(extra);
    }
    if (extra.data) {
      Object.assign(extra, {
        tag: extra.data.tag || extra.tag,
        id: extra.data.id || extra.id,
      });
    }
  }
  else {
    extra.content = utils.escape(extra.content);
  }
  return `<${extra.tag} class="${extra.type}" id="${extra.id}">${extra.content}</${extra.tag}>`;
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
        .use(decoratePlugin)
        // .use(attrsPlugin)
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

