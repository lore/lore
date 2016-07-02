'use strict';

var expect = require('chai').expect;
var Collection = require('../src/collection');

var API_ROOT = 'http://localhost:1337';

describe('collections#methods', function() {
  // var Posts = null;

  // beforeEach(function() {
  //   Posts = Collection.extend({
  //     url: `${API_ROOT}/posts`
  //   });
  // });

  it('should create url from a string', function() {
    var Posts = Collection.extend({
      url: `${API_ROOT}/posts`
    });

    var posts = new Posts();
    expect(posts.url).to.eq(`${API_ROOT}/posts`);
  });

  it('should create url from a function', function() {
    var Posts = Collection.extend({
      url: function() {
        return `${API_ROOT}/posts`;
      }
    });

    var posts = new Posts();
    expect(posts.url()).to.eq(`${API_ROOT}/posts`);
  });

});
