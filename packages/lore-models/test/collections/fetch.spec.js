'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var Collection = require('../../src/collection');

var API_ROOT = 'http://localhost:1337';

describe('collections#fetch', function() {
  var Posts = null;

  beforeEach(function() {
    Posts = Collection.extend({
      url: `${API_ROOT}/posts`,

      parse: function(resp, options) {
        this.extraParseParam = 'Extra Parse Param';
        return resp;
      }
    });
  });

  beforeEach(function() {
    nock(API_ROOT)
      .persist()
      .get(`/posts`)
      .query(false)
      .reply(200, [
        {
          id: 1,
          title: "One"
        },{
          id: 2,
          title: "Two"
        }
      ]);

    nock(API_ROOT)
      .persist()
      .get(`/posts`)
      .query({title: 'One'})
      .reply(200, [
        {
          id: 1,
          title: "One"
        }
      ]);
  });

  it('it will call the root endpoint', function(done) {
    var posts = new Posts();

    posts.fetch().then(function(result) {
      expect(result.status).to.eq(200);
      expect(result.data.length).to.eq(2);
      expect(result.data[0].title).to.eq('One');
      expect(result.data[1].title).to.eq('Two');
      done();
    }).catch(function(err) {
      console.log(err);
    });
  });

  it('it will convert data to query parameters', function(done) {
    var posts = new Posts();

    posts.fetch({
      data: {
        title: 'One'
      }
    }).then(function(result) {
      expect(result.status).to.eq(200);
      expect(result.data.length).to.eq(1);
      expect(result.data[0].title).to.eq('One');
      done();
    }).catch(function(err) {
      console.log(err);
    });
  });

  it('it will invoke parse if provided', function(done) {
    var posts = new Posts();

    posts.fetch().then(function(result) {
      expect(posts.extraParseParam).to.eq('Extra Parse Param');
      done();
    });
  });

});
