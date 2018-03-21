import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import fileLoader from './fileLoader'

const mock = new MockAdapter(axios);

describe('fileLoader', () => {

  /*{{{*/describe('load', () => {

    const url = '/test'
    const urlData = 'test response'

    mock.onGet(url).reply(200, urlData);

    it('must load content', (done) => {
      return fileLoader.load(url)
        .then(data => {
          expect(data).toEqual(urlData);
          done();
        })
      ;
    })

    const failUrl = '/testFail'

    mock.onGet(failUrl).reply(404);

    it('must fail', (done) => {
      return fileLoader.load(failUrl)
        .catch(err => {
          expect(err.response.status).toBe(404);
          done();
        })
      ;
    })

  })/*}}}*/

})

