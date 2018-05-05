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
  return `/**
 * @module ${entityName}
 * @author lilliputten <lilliputten@yandex.ru>
 * @since ${dateStr}
 * @version ${dateStr}
 */

import { ${mod.name? 'declMod' : 'decl'} } from 'bem-react-core';

const ${jsEntityShortName} = /** @lends ${entityName}.prototype */ {

  block: '${block}'${elem? `,

  elem: '${elem}'` : ''},

}

export default ${mod.name?
  `declMod({ ${toObjectKey(mod.name)}: ${toObjectValue(mod.val || true)} }, ` :
  'decl('}${jsEntityShortName});
`;
};/*}}}*/
