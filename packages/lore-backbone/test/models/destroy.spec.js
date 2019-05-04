'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var Model = require('../../src/model');

var API_ROOT = 'http://localhost:1337';

describe('models#destroy', function() {
  var Post = null;

  beforeEach(function() {
    Post = Model.extend({
      urlRoot: `${API_ROOT}/posts`
    });
  });

  beforeEach(function() {
    nock(API_ROOT)
      .persist()
      .delete(`/posts/123`)
      .reply(204, {
        // no response
      });
  });

  it('it will call the appropriate endpoint', function(done) {
    var post = new Post({
      id: 123
    });

    post.destroy().then(function(result) {
      expect(result.status).to.eq(204);
      done();
    }).catch(function(err) {
      console.log(err);
    });
  });

});
