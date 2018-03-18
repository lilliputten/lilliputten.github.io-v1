// const MdParser = require('./MdParser').default;
import MdParser from './MdParser'

const parser = new MdParser();

const md1 = '# Test file content\ncontent';
const html1 = '<h1>Test file content</h1>\n<p>content</p>';
const parsed1 = parser.parse(md1);

// TODO 2018.03.13, 00:46 -- Add tests for extra tags.

describe('MdParser', () => {

  describe('parse', () => {

    it('match snapshot', () => {
      expect(parsed1).toMatchSnapshot();
    })

    it('parsed html', () => {
      expect(parsed1.trim()).toEqual(html1);
    })

  })

})
