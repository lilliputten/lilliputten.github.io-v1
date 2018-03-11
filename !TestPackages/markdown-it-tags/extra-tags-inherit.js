/**
 *
 * @module extra-tags
 *
 * Based on `markdown-it-regexp`.
 *
 * @since 2018.03.06, 01:28
 * @version 2018.03.06, 01:28
 *
 */

// import inherit from 'inherit'
const inherit = require('inherit')

// Escaping html entities utility
// import utils from './utils'
const utils = require('./utils')

// Unique id counter
let uniqueCounter = 0;

const Plugin_proto = /** @lends Plugin.prototype */{

  /** __constructor ** {{{ Create callable function object
   * @param {Function} replacer
   * @return {Function}
   */
  __constructor : function (replacer) {

    // Returning function
    let self = function(md, options) {
      self.options = options;
      self.init(md);
    };

    Object.setPrototypeOf(self, Plugin.prototype); // Plugin_proto);

    // Copy init options
    self.replacer = replacer;

    // This plugin can be inserted multiple times,
    // so we're generating unique name for it
    self.id = 'extraTag-' + ( uniqueCounter++ );

    return self;

  },/*}}}*/

  /** init ** {{{ Function that registers plugin with markdown-it */
  init : function (md) {

    md.inline.ruler.push(this.id, this.parse.bind(this));
    md.renderer.rules[this.id] = this.render.bind(this);

  },/*}}}*/

  /** parse ** {{{ Parse string
   * @param {Object} state
   * @param {Boolean} silent
   * @return {Boolean}
   */
  parse : function (state, silent) {

    const strPart = state.src.slice(state.pos);

    let startPos = strPart.indexOf('<%');

    if ( startPos === -1 ) {
      return false;
    }

    startPos += 2;

    let endPos = strPart.indexOf('%>', startPos);
    let nextPos = endPos + 2;

    if ( endPos === -1 ) {
      return false;
      // TODO: Continuous parsing (multiple chuncks)?
      // TODO: Use src instead strPart if looking?
      // Waiting for close tag...
      // this.looking = true;
    }

    endPos = nextPos = strPart.length;

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

  },/*}}}*/

  /** render ** {{{ Make replacement
   * @param {Object[]} tokens
   * @param {Number} id
   * @param {Object} options
   * @param {Object} env
   * @return {String}
   * */
  render : function (tokens, id, options, env) {
    const content = tokens[id].meta.content;
    return this.replacer(content, utils);
  },/*}}}*/

}

const Plugin = inherit(Function, Plugin_proto);
module.exports = Plugin;
