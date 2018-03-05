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
let counter = 0;

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

    // Clone regexp with all the flags
    let flags = (regexp.global ? 'g' : '')
              + (regexp.multiline ? 'm' : '')
              + (regexp.ignoreCase ? 'i' : '')
    ;

    self.regexp = RegExp('^' + regexp.source, flags);

    // Copy init options
    self.replacer = replacer;

    // This plugin can be inserted multiple times,
    // so we're generating unique name for it
    self.id = 'regexp-' + (counter++);

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

    // slowwww... maybe use an advanced regexp engine for this
    const strPart = state.src.slice(state.pos);
    const match = this.regexp.exec(strPart);

    // Not found...
    if (!match) {
      return false;
    }

    // valid match found, now we need to advance cursor
    const found = match[0];
    state.pos += found.length;

    // don't insert any tokens in silent mode
    if (silent) {
      return true;
    }

    let token = state.push(this.id, '', 0);
    token.meta = { match : match };

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
    const match = tokens[id].meta.match;
    return this.replacer(match, utils);
  }/*}}}*/

}

module.exports = Plugin;
