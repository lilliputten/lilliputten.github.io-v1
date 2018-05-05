import React, { Fragment } from 'react';
import { decl, Bem } from 'bem-react-core';

import Enzyme, { mount/* , shallow */ } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reactTools from 'libs/reactTools';

Enzyme.configure({ adapter: new Adapter() })

describe('reactTools', () => {

  // Test components...
  /** Test ** {{{ */
  const Test = decl({
    block : 'Test',
    willInit() {
      this.testMethod = this.testMethod.bind(this);
    },
    testMethod() {
      return 'Test';
    },
    content() {
      return (
        <Fragment>
          <Bem block="Button" tag="button">
            <Bem elem="Text">Go!</Bem>
          </Bem>
        </Fragment>
      );
    },
  }).applyDecls()/*}}}*/
  /** TestWrapper ** {{{ */
  const TestWrapper = decl({
    block : 'TestWrapper',
    willInit() {
      this.testMethod = this.testMethod.bind(this);
    },
    testMethod() {
      return 'TestWrapper';
    },
    content() {
      return (
        <Test/>
      );
    },
  }).applyDecls()/*}}}*/

  /** DOM ** {{{ */
  describe('DOM', () => {

    let testComp;

    beforeAll(() => {
      testComp = mount(
        <TestWrapper />
      );
    })

    afterAll(() => {
      testComp.unmount();
    })

    it('match snapshot', () => {
      expect(testComp).toMatchSnapshot();
    })

    let childWrapper;
    it('find child', () => {
      // get ReactWrapper object by querySelector
      childWrapper = testComp.find('.Test');
      expect(childWrapper).toHaveLength(1);
    })

    it('getComponentDom', () => {
      // get react component from ReactWrapper
      const comp = reactTools.getDomComponent(childWrapper);
      expect(comp).toBeInstanceOf(React.Component);
    })

    let childComp;

    it('findChildBlock', () => {
      // hi-level child block/component finding method
      childComp = reactTools.findChildBlock(testComp, 'Test');
      expect(childComp).toBeInstanceOf(React.Component);
    })

    it('findParentBlock', () => {
      // hi-level parent block/component finding method
      const parentComponent = reactTools.findParentBlock(childComp, 'TestWrapper');
      expect(parentComponent).toBeInstanceOf(React.Component);
    })

  })/*}}}*/

})

