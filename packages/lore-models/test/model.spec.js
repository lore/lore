'use strict';

var expect = require('chai').expect;
var Model = require('../src/model');

var API_ROOT = 'http://localhost:1337';

describe('models#methods', function() {
  var Post = null;

  beforeEach(function() {
    Post = Model.extend({
      urlRoot: `${API_ROOT}/posts`
    });
  });

  it('should create url from urlRoot', function() {
    var post = new Post();
    expect(post.url()).to.eq(`${API_ROOT}/posts`);
  });

});
