'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var Model = require('../../src/model');

var API_ROOT = 'http://localhost:1337';

describe('models#update', function() {
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
      .put(`/posts/123`)
      .reply(200, {
        id: 123,
        title: 'Updated Post Title'
      });
  });

  it('it will update a post', function(done) {
    var post = new Post({
      id: 123,
      title: 'Updated Post Title'
    });

    post.save().then(function(result) {
      expect(result.status).to.eq(200);
      expect(result.data.title).to.eq('Updated Post Title');
      done();
    }).catch(function(err) {
      console.log(err);
    });
  });

  it('it will invoke parse if provided', function(done) {
    var post = new Post({
      id: 123,
      title: 'Updated Post Title'
    });

    post.save().then(function(result) {
      expect(result.status).to.eq(200);
      expect(post.attributes.extraParseParam).to.eq('Extra Parse Param');
      done();
    });
  });

});

