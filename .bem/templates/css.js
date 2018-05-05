
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
  return `\/\/ vim: ft=scss

.${entityName} {
}
`;
};/*}}}*/

