'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var Model = require('../../src/model');

var API_ROOT = 'http://localhost:1337';

describe('models#fetch', function() {
  var Post = null;

  beforeEach(function() {
    Post = Model.extend({
      urlRoot: `${API_ROOT}/posts`,

      parse: function(resp, options) {
        resp.extraParseParam = 'Extra Parse Param';
        return resp;
      }
    });
  });

  beforeEach(function() {
    nock(API_ROOT)
      .persist()
      .get(`/posts/1`)
      .reply(200, {
        id: 1,
        title: "One"
      });
  });

  it('it will call the appropriate endpoint', function(done) {
    var post = new Post({
      id: 1
    });

    post.fetch().then(function(result) {
      expect(result.status).to.eq(200);
      expect(result.data.title).to.eq('One');
      done();
    }).catch(function(err) {
      console.log(err);
    });
  });

  it('it will invoke parse if provided', function(done) {
    var post = new Post({
      id: 1
    });

    post.fetch().then(function(result) {
      expect(result.status).to.eq(200);
      expect(post.attributes.extraParseParam).to.eq('Extra Parse Param');
      done();
    });
  });

});
