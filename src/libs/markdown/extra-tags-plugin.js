/**
 *
 * @module extra-tags-plugin
 *
 * Based on `markdown-it-regexp`.
 *
 * @since 2018.03.06, 01:28
 * @version 2018.03.06, 01:28
 *
 */

// Escaping html entities utility
// import utils from './utils'
const utils = require('./utils');

// Unique id counter
let uniqueCounter = 0;

class Plugin extends Function {

  /** constructor ** {{{ Create callable function object
   * @param {Function} replacer
   * @return {Function}
   */
  constructor(replacer) {

    super();

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

    const foundPos = strPart.indexOf('<%');

    if ( foundPos === -1 ) {
      return false;
    }

    const startPos = foundPos + 2;

    const endPos = strPart.indexOf('%>', startPos);
    const nextPos = endPos + 2;

    if ( endPos === -1 ) {
      return false;
      // TODO: Continuous parsing (multiple chuncks)?
      // TODO: Use src instead strPart if looking?
      // Waiting for close tag...
      // this.looking = true;
    }

    const content = strPart.substr(startPos, endPos - startPos);

    // valid match found, now we need to advance cursor
    state.pos += nextPos;

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

// module.exports = inherit(Function, Plugin);
module.exports = Plugin;
