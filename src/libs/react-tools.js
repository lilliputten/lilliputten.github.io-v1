/**
 * @module react-tools
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.10, 03:56
 * @version 2018.03.10, 04:44
 *
 * TODO:
 *
 * - 2018.03.10, 19:18 -- Find components with modName/modVal & elems.
 *
 */

import ReactDom from 'react-dom'
import jQuery from 'jquery'

const isArray = Array.isArray

const reactTools = {

  /** findParentComponent ** {{{ Find closest parent component
   * @param {ReactObject} thisComp
   * @param {String} compClassName
   * @return {ReactObject}
   * @see [Element.closest() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
   * @see [Document.getElementsByClassName() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
   * @see [ReactDOM - React](https://reactjs.org/docs/react-dom.html#finddomnode)
   */
  findParentComponent : function (thisComp, compClassName) {
    const
      selector = '.' + compClassName,
      thisCompDom = thisComp && ReactDom.findDOMNode(thisComp),
      thisCompJq = thisCompDom && jQuery(thisCompDom), // Vanilla code (not workis in jest environment): thisCompDom.closest && thisCompDom.closest(selector),
      foundDom = thisCompJq && thisCompJq.closest(selector),
      foundComp = foundDom && this.getComponentForDom(foundDom)
    ;
    return foundComp;
  },/*}}}*/

  /** getComponentForDom ** {{{ Get react component instance for given dom node
   * @param {DonObject} dom
   * @return {ReactObject}
   * @see [javascript - React - get React component from a child DOM element? - Stack Overflow](https://stackoverflow.com/questions/24462679/react-get-react-component-from-a-child-dom-element)
   */
  getComponentForDom : function (dom) {
    if (isArray(dom) || dom instanceof jQuery) {
      dom = dom[0];
    }
    if (typeof dom === 'object') {
      for (let key in dom) {
        if (key.startsWith('__reactInternalInstance')) {
          let
            domItem = dom[key],
            // Old (stackoverflow) code (react15.3.0): `comp = domItem._currentElement._owner._instance`
            // NOTE 2018.03.10, 04:44 -- Works with react16
            comp = domItem && domItem.return && domItem.return.stateNode
          ;
          return comp;
        }
      }
    }
  },/*}}}*/

};

export default reactTools;

