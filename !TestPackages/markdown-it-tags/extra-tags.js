/**
 *
 * @module regexp-class
 *
 * Based on `markdown-it-regexp`.
 *
 * @since 2018.03.06, 01:28
 * @version 2018.03.06, 01:28
 *
 */

// Escaping html entities utility
const utils = require('./utils');

// Unique id counter
let uniqueCounter = 0;

class Plugin extends Function {

  /** constructor ** {{{ Create callable function object
   * @param {RegExp} regexp
   * @param {Function} replacer
   * @return {Function}
   */
  constructor(regexp, replacer) {

    // Returning function
    let self = function(md, options) {
      self.options = options;
      self.init(md);
    };

    Object.setPrototypeOf(self, Plugin.prototype);

    // Copy init options
    self.replacer = replacer;

    // This plugin can be inserted multiple times,
    // so we're generating unique name for it
    self.id = 'extraTag-' + ( uniqueCounter++ );

    return self;

  }/*}}}*/

  /** init ** {{{ Function that registers plugin with markdown-it */
  init(md) {

    md.inline.ruler.push(this.id, this.parse.bind(this));
    md.renderer.rules[this.id] = this.render.bind(this);

  }/*}}}*/

  /** parse ** {{{ Parse string
   * @param {Object} state
   * @param {Boolean} silent
   * @return {Boolean}
   */
  parse(state, silent) {

    const strPart = state.src.slice(state.pos);

    let startPos = 0;
    if ( !this.looking ) {
      startPos = strPart.indexOf('{%');

    if ( startPos === -1 ) {
      return false;
    }
    startPos += 2;
    let endPos = strPart.indexOf('%}', startPos);

    // TODO: Continuous parsing (multiple chuncks)

    if ( endPos === -1 ) {
      console.warn('No second pos');
      return false;
      // throw?
    }

    const content = strPart.substr(startPos, endPos - startPos);

    // valid match found, now we need to advance cursor
    state.pos += endPos + 2;

    // don't insert any tokens in silent mode
    if (silent) {
      return true;
    }

    let token = state.push(this.id, '', 0);
    token.meta = { content : content };

    return true;

  }/*}}}*/

  /** render ** {{{ Make replacement
   * @param {Object[]} tokens
   * @param {Number} id
   * @param {Object} options
   * @param {Object} env
   * @return {String}
   * */
  render(tokens, id, options, env) {
    const content = tokens[id].meta.content;
    return this.replacer(content, utils);
  }/*}}}*/

}

module.exports = Plugin;
