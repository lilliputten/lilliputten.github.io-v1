
import config from 'config'

import hashTools from './hashTools'

describe('hashTools', () => {

  /*{{{*/describe('isCorrectHash', () => {

    it('Correct: <EMPTY>', () => {
      expect(hashTools.isCorrectHash('')).toBe(true);
    })

    it('Correct: #!hash/string', () => {
      expect(hashTools.isCorrectHash('#!hash/string')).toBe(true);
    })

    it('Invalid: <null>', () => {
      expect(hashTools.isCorrectHash(null)).toBe(false);
    })

    it('Invalid: https://somewhere.com', () => {
      expect(hashTools.isCorrectHash('https://somewhere.com')).toBe(false);
    })

    it('Invalid: http://localhost/some/page#hash/string', () => {
      expect(hashTools.isCorrectHash('http://localhost/some/page#hash/string')).toBe(false);
    })

    it('Invalid: /some/page#hash/string', () => {
      expect(hashTools.isCorrectHash('/some/page#hash/string')).toBe(false);
    })

  })/*}}}*/

  /*{{{*/describe('toPageId', () => {

    it('<EMPTY> -> <EMPTY>', () => {
      expect(hashTools.toPageId('')).toBe('');
    })

    it('#!hash/string -> hash/string', () => {
      expect(hashTools.toPageId('#!hash/string')).toBe('hash/string');
    })

    it('(invalid) #hash/string -> hash/string', () => {
      expect(hashTools.toPageId('#hash/string')).toBe('hash/string');
    })

  })/*}}}*/

  /*{{{*/describe('toUrl', () => {

    const rootPrefix = config.site.rootPrefix;
    it('#!hash/string -> ' + rootPrefix + '/hash/string', () => {
      expect(hashTools.toUrl('#!hash/string')).toBe(rootPrefix + '/hash/string');
    })

    const defaultIndex = config.site.defaultIndex;
    it('#!hash/string/ -> ' + rootPrefix + '/hash/string/' + defaultIndex, () => {
      expect(hashTools.toUrl('#!hash/string/')).toBe(rootPrefix + '/hash/string/' + defaultIndex);
    })

    it('<EMPTY> -> ' + rootPrefix + '/' + defaultIndex, () => {
      expect(hashTools.toUrl('')).toBe(rootPrefix + '/' + defaultIndex);
    })

    it('(invalid) #hash/string -> ' + rootPrefix + '/hash/string', () => {
      expect(hashTools.toUrl('#hash/string')).toBe(rootPrefix + '/hash/string');
    })

  })/*}}}*/

  /*{{{*/describe('fromUrl', () => {

    const rootPrefix = config.site.rootPrefix;
    const defaultExt = config.site.defaultExts[0];
    const extStr = rootPrefix + '/hash/string' + defaultExt;
    it(extStr + ' -> #!hash/string', () => {
      return expect(hashTools.fromUrl(extStr)).toBe('#!hash/string');
      // config.site.defaultExts.map((ext) => {
      //   return expect(hashTools.fromUrl('#!hash/string' + ext)).toBe('/hash/string');
      // });
    })

    const indexStr = rootPrefix + '/hash/string/' + config.site.defaultIndex;
    it(indexStr + ' -> #!hash/string/', () => {
      expect(hashTools.fromUrl(indexStr)).toBe('#!hash/string/');
    })

    const rootIndexStr = rootPrefix + '/' + config.site.defaultIndex;
    it(rootIndexStr + ' -> <EMPTY>', () => {
      expect(hashTools.fromUrl(rootIndexStr)).toBe('');
    })

    const defaultStr = rootPrefix + '/' + config.site.defaultPage;
    it(defaultStr + ' -> <EMPTY>', () => {
      expect(hashTools.fromUrl(defaultStr)).toBe('');
    })

    const invalidUrl = 'https://google.com/';
    it('(invalid) ' + invalidUrl + ' -> <null>', () => {
      expect(hashTools.fromUrl(invalidUrl)).toBe(null);
    })
  })/*}}}*/

  /*{{{*/describe('getPageId', () => {

    it('#!hash/string -> hash/string', () => {
      expect(hashTools.getPageId('#!hash/string')).toBe('hash/string');
    })

    const rootPrefix = config.site.rootPrefix;
    it(rootPrefix + '/hash/string -> hash/string', () => {
      expect(hashTools.getPageId(rootPrefix + '/hash/string')).toBe('hash/string');
    })

    const defaultExt = config.site.defaultExts[0];
    it(rootPrefix + '/hash/string' + defaultExt +' -> hash/string', () => {
      expect(hashTools.getPageId(rootPrefix + '/hash/string' + defaultExt)).toBe('hash/string');
    })

    const defaultIndex = config.site.defaultIndex;
    it(rootPrefix + '/hash/string/' + defaultIndex + defaultExt +' -> hash/string/', () => {
      expect(hashTools.getPageId(rootPrefix + '/hash/string/' + defaultIndex + defaultExt)).toBe('hash/string/');
    })

    // See below -> returns default page for empty url
    // it('<EMPTY> -> <EMPTY>', () => {
    //   expect(hashTools.getPageId('')).toBe('');
    // })

    const defaultPage = config.site.defaultPage;
    it('<EMPTY> -> ' + defaultPage + ' (default)', () => {
      expect(hashTools.getPageId('')).toBe(defaultPage);
    })

    it('Fail: null -> null', () => {
      expect(hashTools.getPageId(null)).toBe(null);
    })

    it('Fail: https://somewhere.com -> null', () => {
      expect(hashTools.getPageId('https://somewhere.com')).toBe(null);
    })

    it('Fail: http://localhost/some/page#hash/string -> null', () => {
      expect(hashTools.getPageId('http://localhost/some/page#hash/string')).toBe(null);
    })

    it('Fail: /some/page#hash/string -> null', () => {
      expect(hashTools.getPageId('/some/page#hash/string')).toBe(null);
    })

  })/*}}}*/

})

