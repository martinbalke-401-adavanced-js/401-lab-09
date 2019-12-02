const { server } = require('../lib/server.js');
const supertester = require('./supertester.js');

const mockRequest = supertester(server);

describe('Tests for router ', () => {
  it('Get a 200 response from the homepage', async () => {
    let response = await mockRequest.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Homepage');
  });

  it('Get a 200 response from a model request', async () => {
    let response = await mockRequest.get('/todo');
    expect(response.status).toBe(200);
  });

  it('Get a 200 response from a model request with an id', async () => {
    let response = await mockRequest.get('/todo/5db7c78ac178a33811faa389');
    expect(response.status).toBe(200);
  });

  it('Get a 200 response from a model schema request', async () => {
    let response = await mockRequest.get('/todo/schema');
    expect(response.status).toBe(200);
  });

  let dummyData = {
    difficulty: 1,
    complete: true,
    _id: '5db7c78ac178a33811faa38a',
    text: 'watch a movie',
    category: 'entertainment',
    assignee: 'Rene'};

  it('Get a 200 response from a model put request', async () => {
    let response = await mockRequest.put(`/todo/${dummyData._id}`).send(dummyData);
    expect(response.status).toBe(200);
  });

  it('Get a 200 response from a model post request', async () => {
    let response = await mockRequest.post(`/todo`).send(dummyData);
    expect(response.status).toBe(200);
  });
});

describe('error testing', () => {
  it('Get a 500 response from a bad path', async () => {
    let response = await mockRequest.get('/todo/shrow');
    expect(response.status).toBe(500);
  });

  it('Get a 404 response from a bad path', async () => {
    let response = await mockRequest.get('/todo/cats/morecats');
    expect(response.status).toBe(404);
  });
});