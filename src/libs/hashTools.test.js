
import config from 'libs/config'

import hashTools from './hashTools'

describe('hashTools', () => {

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
    const defaultExt = config.site.defaultExtensions[0];
    const extStr = rootPrefix + '/hash/string' + defaultExt;
    it(extStr + ' -> #!hash/string', () => {
      return expect(hashTools.fromUrl(extStr)).toBe('#!hash/string');
      // config.site.defaultExtensions.map((ext) => {
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

  })/*}}}*/

})

