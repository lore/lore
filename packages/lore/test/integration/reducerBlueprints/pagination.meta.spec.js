var expect = require('chai').expect;
var Lore = require('../../../src/app/index');
var loaderHelper = require('../../helpers/loaderHelper');
var nock = require('nock');
var _ = require('lodash');
var config = {
  hooks: require('../../defaultHooks')
};

var API_ROOT = 'http://localhost:1337';
var TEST_DELAY = 100;

describe('lore#reducerBlueprints#pagination#query', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
  });

  describe('query tests', function() {

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
          page: '1'
        })
        .reply(200, [
          { id: 1, title: 'One', authorId: '1' },
          { id: 2, title: 'Two', authorId: '1' },
          { id: 3, title: 'Three', authorId: '1' },
          { id: 4, title: 'Four', authorId: '1' },
          { id: 5, title: 'Five', authorId: '1' }
        ]);
    });

    it("should create store states for .byId, .byCid, and. find", function(done) {
      lore.build(config);
      lore.actions.post.find({
        authorId: '1'
      }, {
        page: '1'
      });

      setTimeout(function() {
        var state = lore.store.getState();
        var reducer = state.post.find;

        expect(_.keys(reducer).length).to.eql(1);
        var page1 = reducer['{"where":{"authorId":"1"},"pagination":{"page":"1"}}'];
        expect(page1.data.length).to.eql(5);
        expect(page1.query).to.eql({
          where: {
            authorId: '1'
          },
          pagination: {
            page: '1'
          }
        });

        done();
      }, TEST_DELAY);

    });
  });

});

