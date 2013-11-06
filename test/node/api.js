var APIeasy = require('api-easy'),
  assert = require('assert'),
  mock = require('../mocks/new_york');

var suite = APIeasy.describe('api');

suite.discuss('When using the Freebase API')
  .discuss('the geocode resource')
  .use('localhost', 9999)
//  .setHeader('Content-Type', 'application/json')
  .get('/freebase/lat/40.7144/lng/-74.006')
    .expect(200)
    .expect('should return mock data', function (err, res, body) {
      assert.equal(res, mock.new_york());
    })
  .export(module);