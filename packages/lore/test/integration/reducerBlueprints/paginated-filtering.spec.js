var expect = require('chai').expect;
var Lore = require('../../../src/app/index');
var loaderHelper = require('../../helpers/loaderHelper');
var nock = require('nock');
var _ = require('lodash');

var API_ROOT = 'http://localhost:1337';
var TEST_DELAY = 100;

describe('lore#reducerBlueprints#paginated-filtering', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
  });

  describe('find-create pattern with a single query parameter', function() {

    beforeEach(function() {
      loaderHelper.stub({
        config: {
          models: {
            apiRoot: API_ROOT
          }
        },
        models: {
          post: {}
        }
      });

      nock(API_ROOT)
        .persist()
        .get('/posts')
        .query({
          authorId: '1',
          page: 1
        })
        .reply(200, [
          { id: 1, title: 'One', authorId: '1' }
        ]);

      nock(API_ROOT)
        .persist()
        .post('/posts')
        .reply(201, {
          id: 2,
          title: 'Two',
          authorId: '1'
        });
    });

    it("should combine data for simple queries", function(done) {
      lore.build();
      lore.actions.post.find({
        authorId: '1',
        page: '1'
      });

      setTimeout(function() {
        var state = lore.store.getState();
        var reducer = state.post.find;

        expect(_.keys(reducer).length).to.eql(1);
        var query1 = reducer['{"where":{"authorId":"1","page":"1"}}'];
        expect(query1.data.length).to.eql(1);

        lore.actions.post.create({
          title: 'Two',
          authorId: '1'
        });

        setTimeout(function() {
          var state = lore.store.getState();
          var reducer = state.post.find;

          expect(_.keys(reducer).length).to.eql(1);
          var query2 = reducer['{"where":{"authorId":"1","page":"1"}}'];

          expect(query2.data.length).to.eql(1);
          done();
        }, TEST_DELAY);
      }, TEST_DELAY);

    });
  });

  describe('find-create pattern with two query parameters', function() {

    beforeEach(function() {
      loaderHelper.stub({
        config: {
          models: {
            apiRoot: API_ROOT
          }
        },
        models: {
          post: {}
        }
      });

      nock(API_ROOT)
        .persist()
        .get('/posts')
        .query({
          authorId: '1',
          title: 'One'
        })
        .reply(200, [
          { id: 1, title: 'One', authorId: '1' }
        ]);

      nock(API_ROOT)
        .persist()
        .post('/posts')
        .reply(201, {
          id: 2,
          title: 'One',
          authorId: '1'
        });
    });

    it("should combine data for simple queries", function(done) {
      lore.build();
      lore.actions.post.find({
        authorId: '1',
        title: 'One'
      });

      setTimeout(function() {
        var state = lore.store.getState();
        var reducer = state.post.find;

        expect(_.keys(reducer).length).to.eql(1);
        var query1 = reducer['{"where":{"authorId":"1","title":"One"}}'];
        expect(query1.data.length).to.eql(1);

        lore.actions.post.create({
          title: 'Four',
          authorId: '1'
        });

        setTimeout(function() {
          var state = lore.store.getState();
          var reducer = state.post.find;

          expect(_.keys(reducer).length).to.eql(1);
          var query2 = reducer['{"where":{"authorId":"1","title":"One"}}'];

          expect(query2.data.length).to.eql(2);
          done();
        }, TEST_DELAY);
      }, TEST_DELAY);

    });
  });

  describe('find-create pattern with two queries; empty and single parameter', function() {

    beforeEach(function() {
      loaderHelper.stub({
        config: {
          models: {
            apiRoot: API_ROOT
          }
        },
        models: {
          post: {}
        }
      });

      nock(API_ROOT)
        .persist()
        .get('/posts')
        .reply(200, [
          { id: 1, title: 'One', authorId: '1' },
          { id: 2, title: 'Two', authorId: '2' },
          { id: 3, title: 'Three', authorId: '3' }
        ]);

      nock(API_ROOT)
        .persist()
        .get('/posts')
        .query({
          authorId: '1'
        })
        .reply(200, [
          { id: 1, title: 'One', authorId: '1' }
        ]);

      nock(API_ROOT)
        .persist()
        .post('/posts')
        .reply(201, {
          id: 4,
          title: 'Four',
          authorId: '1'
        });
    });

    it("should combine data for simple queries", function(done) {
      lore.build();
      lore.actions.post.find();
      lore.actions.post.find({
        authorId: '1'
      });

      setTimeout(function() {
        var state = lore.store.getState();
        var reducer = state.post.find;

        expect(_.keys(reducer).length).to.eql(2);
        var query1 = reducer['{"where":{}}'];
        var query2 = reducer['{"where":{"authorId":"1"}}'];
        expect(query1.data.length).to.eql(3);
        expect(query2.data.length).to.eql(1);

        lore.actions.post.create({
          title: 'Four',
          authorId: '1'
        });

        setTimeout(function() {
          var state = lore.store.getState();
          var reducer = state.post.find;

          expect(_.keys(reducer).length).to.eql(2);
          var query3 = reducer['{"where":{}}'];
          var query4 = reducer['{"where":{"authorId":"1"}}'];
          expect(query3.data.length).to.eql(4);
          expect(query4.data.length).to.eql(2);

          done();
        }, TEST_DELAY);
      }, TEST_DELAY);

    });
  });

});

