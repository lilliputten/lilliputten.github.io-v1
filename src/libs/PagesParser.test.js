// const PagesParser = require('./PagesParser').default;
import PagesParser from './PagesParser'

const parser = new PagesParser();

const md1 = '# Test file content\ncontent';
const html1 = '<h1>Test file content</h1>\n<p>content</p>';
const parsed1 = parser.parse(md1);

// TODO 2018.03.13, 00:46 -- Add tests for extra tags.

describe('PagesParser', () => {

  describe('parse', () => {

    it('match snapshot', () => {
      expect(parsed1).toMatchSnapshot();
    })

    it('parsed html', () => {
      expect(parsed1.html.trim()).toEqual(html1);
    })

  })

})
