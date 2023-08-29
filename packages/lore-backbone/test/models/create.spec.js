'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var Model = require('../../src/model');

var API_ROOT = 'http://localhost:1337';

describe('models#create', function() {
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
      .post(`/posts`)
      .reply(201, {
        id: 1,
        title: 'Post Title'
      });
  });

  it('it will create a post', function(done) {
    var post = new Post({
      title: 'Post Title'
    });

    post.save().then(function(result) {
      expect(result.status).to.eq(201);
      // expect(result.statusText).to.eq('Created');
      expect(result.data.title).to.eq('Post Title');
      done();
    }).catch(function(err) {
      console.log(err);
    });
  });

  it('it will invoke parse if provided', function(done) {
    var post = new Post({
      title: 'Post Title'
    });

    post.save().then(function(result) {
      expect(result.status).to.eq(201);
      expect(post.attributes.extraParseParam).to.eq('Extra Parse Param');
      done();
    });
  });

});

