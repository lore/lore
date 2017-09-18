'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var Model = require('../src/model');
var Collection = require('../src/collection');
var sync = require('../src/sync');

var API_ROOT = 'http://localhost:1337';

describe('sync', function() {

  describe('when provided a model', function() {
    var Post = null;

    beforeEach(function() {
      Post = Model.extend({
        urlRoot: `${API_ROOT}/posts`
      });
    });

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .get(`/posts`)
        .reply(200);

      nock(API_ROOT)
        .persist()
        .post(`/posts`)
        .reply(201);

      nock(API_ROOT)
        .persist()
        .put(`/posts/1`)
        .reply(200);

      nock(API_ROOT)
        .persist()
        .delete(`/posts/1`)
        .reply(204);
    });

    it('should convert `read` to a GET request', function(done) {
      var model = new Post();

      sync('read', model).then(function(result) {
        expect(result.status).to.eq(200);
        expect(result.config.method).to.eq('GET');
        expect(result.request.path).to.eq(`/posts`);
        done();
      });
    });

    it('should convert `create` to a POST request', function(done) {
      var model = new Post();

      sync('create', model).then(function(result) {
        expect(result.status).to.eq(201);
        expect(result.config.method).to.eq('POST');
        expect(result.request.path).to.eq(`/posts`);
        done();
      });
    });

    it('should convert `update` to a PUT request', function(done) {
      var model = new Post({
        id: 1
      });

      sync('update', model).then(function(result) {
        expect(result.status).to.eq(200);
        expect(result.config.method).to.eq('PUT');
        expect(result.request.path).to.eq(`/posts/1`);
        done();
      });
    });

    it('should convert `delete` to a DELETE request', function(done) {
      var model = new Post({
        id: 1
      });

      sync('delete', model).then(function(result) {
        expect(result.status).to.eq(204);
        expect(result.config.method).to.eq('DELETE');
        expect(result.request.path).to.eq(`/posts/1`);
        done();
      });
    });

  });

  describe('when provided a collection', function() {
    var Posts = null;

    beforeEach(function() {
      Posts = Collection.extend({
        url: `${API_ROOT}/posts`
      });
    });

    beforeEach(function() {
      nock(API_ROOT)
        .persist()
        .get(`/posts`)
        .reply(200);

      nock(API_ROOT)
        .persist()
        .get(`/posts`)
        .query({title: 'Test'})
        .reply(200);
    });

    it('should convert `read` to a GET request', function(done) {
      var collection = new Posts();

      sync('read', collection).then(function(result) {
        expect(result.status).to.eq(200);
        expect(result.config.method).to.eq('GET');
        expect(result.request.path).to.eq(`/posts`);
        done();
      });
    });

    it('should convert data to query parameters', function(done) {
      var collection = new Posts();
      var options = {
        data: {
          title: 'Test'
        }
      };

      sync('read', collection, options).then(function(result) {
        expect(result.status).to.eq(200);
        expect(result.config.method).to.eq('GET');
        expect(result.request.path).to.eq(`/posts?title=Test`);
        done();
      });
    });

    it('should attach headers to request', function(done) {
      var collection = new Posts();
      var options = {
        headers: {
          Authorization: 'Bearer token'
        }
      };

      sync('read', collection, options).then(function(result) {
        expect(result.config.headers).to.contain({
          Authorization: 'Bearer token'
        });
        done();
      });
    })

  })

});
