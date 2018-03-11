import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import fileLoader from './fileLoader'

describe('fileLoader', () => {

  /** load ** {{{ */
  describe('load', () => {

    const url = '/test'
    const resp = 'test response'

    beforeAll(() => {
      const mock = new MockAdapter(axios);
      mock.onGet(url).reply(200, resp);
    })

    it('must load content', (done) => {
      return fileLoader.load(url)
        .then(data => {
          expect(data).toEqual(resp);
          done();
        })
      ;
    })

  })/*}}}*/

})

