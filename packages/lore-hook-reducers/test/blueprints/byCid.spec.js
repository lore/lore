var expect = require('chai').expect;
var _ = require('lodash');
var byCid = require('../../src/blueprints/byCid');
var ActionTypes = require('lore-utils').ActionTypes;

describe('blueprints#byCid', function() {
  var modelName = 'todo';
  var blueprint = byCid;
  var reducer = null;

  beforeEach(function() {
    reducer = blueprint(modelName);
  });

  describe("when initialized", function() {
    it("should default state to a dictionary", function() {
      var state = reducer(null, {
        type: ActionTypes.add('not' + modelName)
      });
      expect(state).to.be.an('object');
      expect(_.keys(state).length).to.equal(0);
    })
  });

  describe("when sent an ADD action", function() {
    var action;

    beforeEach(function() {
      action = {
        type: ActionTypes.add(modelName),
        payload: {
          cid: 'c1'
        }
      }
    });

    it("should add the model to the dictionary if a cid exists", function() {
      var state = reducer(null, action);
      expect(_.keys(state).length).to.equal(1);
      expect(state['c1'].cid).to.equal('c1');
    });
  });

  describe("when sent two ADD actions", function() {
    var action1, action2;

    beforeEach(function() {
      action1 = {
        type: ActionTypes.add(modelName),
        payload: {
          cid: 'c1'
        }
      };

      action2 = {
        type: ActionTypes.add(modelName),
        payload: {
          cid: 'c2'
        }
      }
    });

    it("should have two items in the dictionary", function() {
      var state = reducer(null, action1);
      state = reducer(state, action2);
      expect(_.keys(state).length).to.equal(2);
      expect(state['c1'].cid).to.equal('c1');
      expect(state['c2'].cid).to.equal('c2');
    });
  });

  describe("when sent an ADD action with no cid", function() {
    var action;

    beforeEach(function() {
      action = {
        type: ActionTypes.add(modelName),
        payload: {
          id: 1
        }
      };
    });

    it("should not add it to the dictionary", function() {
      var state = reducer(null, action);
      expect(_.keys(state).length).to.equal(0);
    });
  })

});

