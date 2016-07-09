var expect = require('chai').expect;
var Lore = require('../../../src/app/index');
var loaderHelper = require('../../helpers/loaderHelper');
var nock = require('nock');
var _ = require('lodash');

var API_ROOT = 'https://api.github.com/search';
var TEST_DELAY = 100;

describe('lore#reducerBlueprints#pagination', function() {
  var lore = null;

  beforeEach(function() {
    lore = new Lore();
  });

  describe('when models exist', function() {

    beforeEach(function() {
      loaderHelper.stub({
        config: {
          models: {
            apiRoot: API_ROOT
          }
        },
        models: {
          repository: {}
        }
      });

      nock(API_ROOT)
        .persist()
        .get('/repositories')
        .query({
          q: 'stars:>1000',
          sort: 'stars',
          per_page: 5,
          page: '1'
        })
        .reply(200, [
          { id: 1, title: 'One' },
          { id: 2, title: 'Two' },
          { id: 3, title: 'Three' },
          { id: 4, title: 'Four' },
          { id: 5, title: 'Five' }
        ]);

      nock(API_ROOT)
        .persist()
        .get(`/repositories`)
        .query({
          q: 'stars:>1000',
          sort: 'stars',
          per_page: 5,
          page: '2'
        })
        .reply(200, [
          { id: 6, title: 'Six' },
          { id: 7, title: 'Seven' },
          { id: 8, title: 'Eight' },
          { id: 9, title: 'Nine' },
          { id: 10, title: 'Ten' }
        ]);
    });

    it("should create store states for .byId, .byCid, and. find", function(done) {
      lore.build();
      lore.actions.repository.find({
        q: 'stars:>1000',
        sort: 'stars',
        per_page: 5,
        page: '1'
      });

      setTimeout(function() {
        var state = lore.store.getState();
        var reducer = state.repository.find;

        expect(_.keys(reducer).length).to.eql(1);
        var page1 = reducer['{"where":{"q":"stars:>1000","sort":"stars","per_page":5,"page":"1"}}'];
        expect(page1.data.length).to.eql(5);

        lore.actions.repository.find({
          q: 'stars:>1000',
          sort: 'stars',
          per_page: 5,
          page: '2'
        });

        setTimeout(function() {
          var state = lore.store.getState();
          var reducer = state.repository.find;

          expect(_.keys(reducer).length).to.eql(2);
          var page1 = reducer['{"where":{"q":"stars:>1000","sort":"stars","per_page":5,"page":"1"}}'];
          var page2 = reducer['{"where":{"q":"stars:>1000","sort":"stars","per_page":5,"page":"2"}}'];

          expect(page1.data.length).to.eql(5);
          expect(page2.data.length).to.eql(5);
          done();
        }, TEST_DELAY);
      }, TEST_DELAY);

    });
  });

});

