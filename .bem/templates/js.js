/**
 * @module js template
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.05.06, 02:40
 * @version 2018.05.06, 02:54
 */

const dateStr = require('dateformat')(new Date(), 'yyyy.mm.dd HH:MM');

const nameRegEx = /^[a-zA-Z_][a-zA-Z\d_]*$/;

/** toObjectKey ** {{{
 */
function toObjectKey(str) {
    return nameRegEx.test(str) ? str : `'${str}'`;
}/*}}}*/

/** toObjectValue ** {{{
 */
function toObjectValue(x) {
    return typeof x === 'boolean' ? x : `'${x}'`;
}/*}}}*/

/** getEntityName ** {{{
 */
function getEntityName  ({ block, elem, mod={} }) {
  let entityName = block;
  if ( elem ) {
    entityName += '-' + elem;
  }
  if ( mod.name ) {
    entityName += '_' + mod.name;
    if ( mod.val && mod.val !== true ) {
      entityName += '_' + mod.val;
    }
  }
  return entityName;
}/*}}}*/

/** module.exports ** {{{
 */
module.exports = function ({ block, elem, mod={} }) {

  const entityName = getEntityName({ block, elem, mod });
  const jsEntityName = entityName.replace(/-/g, '__');
  const jsEntityShortName = ( jsEntityName.length > block.length ) ? jsEntityName.substr(block.length) : jsEntityName;

  const at = '@';

  // Module content...
  return `/**
 * ${at}module ${entityName}
 * ${at}author lilliputten <lilliputten@yandex.ru>
 * ${at}since ${dateStr}
 * ${at}version ${dateStr}
 */

import { ${mod.name? 'declMod' : 'decl'} } from 'bem-react-core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
// import { connect } from 'react-redux';

// import config from 'config';

const ${jsEntityShortName} = /** @lends ${entityName}.prototype */ {

  block: '${block}'${elem? `,

  elem: '${elem}'` : ''},

  /** willInit ** {{{ */
  willInit() {

    this.state = {
      mode: this.props.mode,
    };

    // Subscribe to store for page changing...
    this.props.store && this.storeEvent && this.props.store.subscribe(this.storeEvent.bind(this));

  },/*}}}*/

  /** mods ** {{{ Modifiers... */
  mods(self) {
    const mode = this.state.mode;
    return {
      ...self.mods,
      mode,
    };
  },/*}}}*/

  /** content ** {{{ */
  content() {
    return (
      <Fragment>
        ${entityName}
      </Fragment>
    );
  },/*}}}*/

}

/** Static... ** {{{ */
const ${jsEntityShortName}_static = /* @lends ${entityName} */ {

  propTypes: {
    mode: PropTypes.string.isRequired,
  },

}/*}}}*/

export default ${mod.name?
  `declMod({ ${toObjectKey(mod.name)}: ${toObjectValue(mod.val || true)} }, ` :
  'decl('}${jsEntityShortName}, ${jsEntityShortName}_static);
`;

};/*}}}*/
