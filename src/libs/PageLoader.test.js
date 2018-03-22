import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import config from 'config'
import hashTools from 'libs/hashTools'

import PageLoader from './PageLoader'

const pageLoader = new PageLoader();

const mock = new MockAdapter(axios);

// TODO 2018.03.13, 00:46 -- Add tests for extra tags.

describe('PageLoader', () => {

  /*{{{*/describe('general', () => {

    it('is object', () => {
      expect(typeof pageLoader).toBe('object');
    })

    it('has method `load`', () => {
      expect(typeof pageLoader.load).toBe('function');
    })

  })/*}}}*/

  /*{{{*/describe('load', () => {

    const pageBody = 'page content';
    const pageHtml = '<p>' + pageBody + '</p>\n';

    /*{{{*/describe('page with content only', () => {

      // Page...
      const pageId = 'test/test';
      const pageHash = hashTools.fromPageId(pageId);
      const pageUrl = hashTools.toUrl(pageHash, config.site.defaultExt);
      const paramsUrl = hashTools.toUrl(pageHash, config.site.dataExt);

      // To store loaded page data
      let pageResult;

      /** beforeAll ** {{{ */
      beforeAll(() => {

        // Set mocks...
        mock.onAny(pageUrl).reply(200, pageBody);
        mock.onAny(paramsUrl).reply(404);

        // Load file, set result for analyzing, return promise
        return pageLoader.load(pageId).then(result => (pageResult = result));

      })/*}}}*/
      /** afterAll ** {{{ */
      afterAll(() => {

        mock.reset();

      })/*}}}*/

      it('snapshot', () => {
        expect(pageResult).toMatchSnapshot();
      })

      it('body', () => {
        expect(pageResult.body).toBe(pageBody);
      })

      it('html', () => {
        expect(pageResult.html).toBe(pageHtml);
      })

      it('isCached', () => {
        expect(pageLoader.isCached(pageId)).toBe(true);
      })

      it('dropCached', () => {
        pageLoader.dropCached(pageId);
        expect(pageLoader.isCached(pageId)).toBe(false);
      })

    })/*}}}*/

    /*{{{*/describe('page with params', () => {

      // Page...
      const pageId = 'test/test';
      const pageHash = hashTools.fromPageId(pageId);
      const pageUrl = hashTools.toUrl(pageHash, config.site.defaultExt);
      const paramsUrl = hashTools.toUrl(pageHash, config.site.dataExt);
      const paramsBody = '{"test":"ok"}';
      const paramsData = JSON.parse(paramsBody); // { test : 'ok' };

      // To store loaded page data
      let pageResult;

      /** beforeAll ** {{{ */
      beforeAll(() => {

        // Set mocks...
        mock.onAny(pageUrl).reply(200, pageBody);
        mock.onAny(paramsUrl).reply(200, paramsBody);

        // Load file, set result for analyzing, return promise
        return pageLoader.load(pageId).then(result => (pageResult = result));

      })/*}}}*/
      /** afterAll ** {{{ */
      afterAll(() => {

        mock.reset();

      })/*}}}*/

      it('snapshot', () => {
        expect(pageResult).toMatchSnapshot();
      })

      it('params', () => {
        expect(pageResult.params.test).toBe(paramsData.test);
      })

    })/*}}}*/

  })/*}}}*/

})
