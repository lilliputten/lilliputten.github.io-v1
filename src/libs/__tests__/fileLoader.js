import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import fileLoader from '../fileLoader'

const mock = new MockAdapter(axios);

describe('fileLoader', () => {

  /*{{{*/describe('getOptionsObject', () => {

    const url = '/test';

    it('url -> options object ({ url })', () => {
      expect(fileLoader.getOptionsObject(url)).toEqual({ url });
    })

  })/*}}}*/

  /*{{{*/describe('load', () => {

    const url = '/test';
    const urlData = 'test response';
    const failUrl = '/testFail';

    /** beforeAll ** {{{ */
    beforeAll(() => {

      // Set mocks
      mock.onAny(url).reply(200, urlData);
      mock.onAny(failUrl).reply(404);

    })/*}}}*/
    /** afterAll ** {{{ */
    afterAll(() => {

      // Reset mocks
      mock.reset();

    })/*}}}*/

    it('must load content', (done) => {
      return fileLoader.load(url)
        .then(data => expect(data).toEqual(urlData))
        .then(done)
      ;
    })

    it('must fail', (done) => {
      return fileLoader.load(failUrl)
        .catch(err => expect(err.response.status).toBe(404))
        .then(done)
      ;
    })

  })/*}}}*/

})

