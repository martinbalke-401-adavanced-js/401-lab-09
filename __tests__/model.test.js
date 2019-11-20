const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');

const mockRequest = supertester(server);

describe('Tests for router ', () => {
  it('Get a 200 response from the homepage', async () => {
    let response = await mockRequest.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Homepage');
  });
});