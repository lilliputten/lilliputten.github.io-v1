
// Mock current date/time
const fakeTime = 1520000000000;
Date.now = jest.fn(() => fakeTime);

const config = require('./config').default;

// ??? Clear mocks?
// jest.clearAllMocks();

describe('config', () => {

  it('DEBUG', () => {
    expect(config.DEBUG).toBeTruthy(); // toEqual('test');
  })

  it('testMode', () => {
    expect(config.testMode).toEqual(true);
  })

  it('match snapshot', () => {
    expect(config).toMatchSnapshot();
  })

})
