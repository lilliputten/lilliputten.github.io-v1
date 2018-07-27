/**
 * @module css template
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.05.06, 02:40
 * @version 2018.05.06, 02:41
 */

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

  // Module content...
  return `\/\/ vim: ft=stylus

.${entityName} {
}
`;

};/*}}}*/

