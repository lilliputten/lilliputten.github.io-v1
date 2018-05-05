/**
 * @module reactTools
 * @author lilliputten <lilliputten@yandex.ru>
 * @since 2018.03.10, 03:56
 * @version 2018.03.10, 04:44
 *
 * TODO:
 *
 * - 2018.03.10, 19:18 -- Find components with modName/modVal & elems.
 * - 2018.03.10, 23:04 -- Move DOM methods to `react-traverse`?
 *
 */

import React from 'react';
import ReactDom from 'react-dom';
import jquery from 'jquery';

const isArray = Array.isArray

const reactTools = {

  // Traverse:

  /** findParentBlock ** {{{ Find closest parent component
   * @param {ReactObject} comp
   * @param {String} compClassName
   * @return {ReactObject}
   * @see [Element.closest() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
   * @see [Document.getElementsByClassName() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
   * @see [ReactDOM - React](https://reactjs.org/docs/react-dom.html#finddomnode)
   */
  findParentBlock : function (comp, compClassName) {
    const selector = '.' + compClassName
    const foundDom = this.applyQuerySelector(comp, 'closest', selector)
    const foundComp = foundDom && this.getDomComponent(foundDom)
    return foundComp;
  },/*}}}*/
  /** findChildBlock ** {{{ Find closest parent component
   * @param {ReactObject} comp
   * @param {String} compClassName
   * @return {ReactObject}
   * @see [Element.closest() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
   * @see [Document.getElementsByClassName() - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName)
   * @see [ReactDOM - React](https://reactjs.org/docs/react-dom.html#finddomnode)
   */
  findChildBlock : function (comp, compClassName) {
    const selector = '.' + compClassName
    const foundDom = this.applyQuerySelector(comp, 'find', selector)
    const foundComp = foundDom && this.getDomComponent(foundDom)
    return foundComp;
  },/*}}}*/

  // DOM:

  /** applyQuerySelector ** {{{ Apply querySelector lookup method
   * @param {Enzyme:ReactWrapper|ReactComponent|jQueryCollection} target
   * @param {String} op - querySelector operator (eg, `find`, `closest`)
   * @param {String} selector - dom selector (`.className`)
   * @return {jQueryCollection|null)
   */
  applyQuerySelector : function (target, op, selector) {
    let dom = this.getComponentDom(target) // (typeof target.getDOMNode === 'function') ? target.getDOMNode : (target instanceof React.Component) ? ReactDom.findDOMNode(target) : target
    const isJQuery = dom instanceof jquery;
    if (!isJQuery) {
      dom = jquery(dom)
    }
    if (typeof dom[op] === 'function') {
      return dom[op].call(dom, selector)
    }
  },/*}}}*/

  /** getComponentDom ** {{{ Get DOM Node for given component
   * @param {Enzyme:ReactWrapper|ReactComponent|jQueryCollection} target
   * @return {DomObject}
   */
  getComponentDom : function (target) {
    let result = target;
    if (typeof target.getDOMNode === 'function') {
      result = target.getDOMNode();
    }
    else if (target instanceof React.Component) {
      result = ReactDom.findDOMNode(target);
    }
    return result;
  },/*}}}*/
  /** getDomComponent ** {{{ Get react component instance for given DOM node
   * @param {DomObject} dom
   * @return {ReactObject}
   * @see [javascript - React - get React component from a child DOM element? - Stack Overflow](https://stackoverflow.com/questions/24462679/react-get-react-component-from-a-child-dom-element)
   */
  getDomComponent : function (dom) {
    if (dom && dom != null && typeof dom === 'object') {
      // Array|Collection...
      if (isArray(dom) || dom instanceof jquery) {
        dom = dom[0];
      }
      // enzyme ReactWrapper...
      if (typeof dom.instance === 'function') {
        dom = dom.instance();
      }
      if (typeof dom === 'object') {
        for (let key in dom) {
          if (key.startsWith('__reactInternalInstance')) {
            const domItem = dom[key]
            // Old (stackoverflow) code (react15.3.0): `comp = domItem._currentElement._owner._instance`
            // NOTE 2018.03.10, 04:44 -- Works with react16
            const comp = domItem && domItem.return && domItem.return.stateNode
            return comp;
          }
        }
      }
    }
  },/*}}}*/

  // url:

  /** getRelativeUrl ** {{{ Get url relative to current document
   * @param {String} url
   * @return {String}
   */
  getRelativeUrl : function (url) {
    if (typeof window === 'object' && window.location && window.location.origin && url.startsWith(window.location.origin)) {
      const len = window.location.origin.length;
      url = url.substr(len);
    }
    return url;
  },/*}}}*/

  // utils:

  /** delay ** {{{ DEBUG: Timeout
   * TODO: Move to `commonTools`
   * @param {Number} [timeout=1000]
   * @param {*} [data]
   * @return {Promise}
   */
  delay(timeout=1000, data){
    return new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve(data);
      }, timeout)
    });
  },/*}}}*/


};

export default reactTools;

