var expect = require('chai').expect;
var _ = require('lodash');
var blueprints = {
  find: require('../src/blueprints/find'),
  byId: require('../src/blueprints/byId'),
  byCid: require('../src/blueprints/byCid')
};
var blueprint = require('../src/reducer');
var ActionTypes = require('lore-utils').ActionTypes;
var Hook = require('lore-utils').Hook;

describe('reducer', function() {
  var modelName = 'todo';
  var reducer = null;

  beforeEach(function() {
    var blueprintReducers = {
      find: blueprints.find(modelName),
      byId: blueprints.byId(modelName),
      byCid: blueprints.byCid(modelName)
    };
    var dependencies = {
      find: ['byId','byCid'],
      byId: [],
      byCid: []
    };
    reducer = blueprint(blueprintReducers, dependencies);
  });

  describe("when initialized", function() {
    it("should default state to a dictionary", function() {
      var state = reducer(null, {
        type: ActionTypes.add('not' + modelName)
      });
      expect(state).to.be.an('object');
      expect(_.keys(state).length).to.equal(3);
      expect(state.byId).to.be.an('object');
      expect(state.byCid).to.be.an('object');
      expect(state.find).to.be.an('object');
    })
  });

  describe("optimistic add sequence with no existing queries", function() {
    var action1, action2;

    beforeEach(function() {
      action1 = {
        type: ActionTypes.add(modelName),
        payload: {
          id: null,
          cid: 'c1'
        }
      };

      action2 = {
        type: ActionTypes.add(modelName),
        payload: {
          id: '1',
          cid: 'c1'
        }
      };
    });

    it("should add the model to the dictionary if an id exists", function() {
      var state = reducer(null, action1);
      expect(_.keys(state.byId).length).to.equal(0);
      expect(_.keys(state.byCid).length).to.equal(1);
      expect(_.keys(state.find).length).to.equal(0);

      var state2 = reducer(state, action2);
      expect(_.keys(state2.byId).length).to.equal(1);
      expect(_.keys(state2.byCid).length).to.equal(1);
      expect(_.keys(state2.find).length).to.equal(0);
    });
  });

  describe("find sequence", function() {
    var action1, action2, query;

    beforeEach(function() {
      query = {
        where: {}
      };

      action1 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query,
        payload: {
          data: []
        }
      };

      action2 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query,
        payload: {
          data: [{
            id: '1',
            cid: 'c1'
          }]
        }
      };
    });

    it("should add the model to the dictionary if an id exists", function() {
      var queryKey = JSON.stringify(query);

      var state = reducer(null, action1);
      expect(_.keys(state.byId).length).to.equal(0);
      expect(_.keys(state.byCid).length).to.equal(0);
      expect(_.keys(state.find).length).to.equal(1);
      expect(state.find[queryKey].data.length).to.equal(0);

      var state2 = reducer(state, action2);
      expect(_.keys(state2.byId).length).to.equal(1);
      expect(_.keys(state2.byCid).length).to.equal(1);
      expect(_.keys(state2.find).length).to.equal(1);
      expect(state2.find[queryKey].data.length).to.equal(1);
    });
  });

  describe("find/add sequence", function() {
    var action1, action2, action3, action4, query;

    beforeEach(function() {
      query = {
        where: {}
      };

      action1 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query,
        payload: {
          data: []
        }
      };

      action2 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query,
        payload: {
          data: [{
            id: '1',
            cid: 'c1'
          }]
        }
      };

      action3 = {
        type: ActionTypes.add(modelName),
        query: query,
        payload: {
          id: null,
          cid: 'c2'
        }
      };

      action4 = {
        type: ActionTypes.add(modelName),
        query: query,
        payload: {
          id: '2',
          cid: 'c2'
        }
      };
    });

    it("should add the model to the dictionary if an id exists", function() {
      var queryKey = JSON.stringify(query);

      var state = reducer(null, action1);
      expect(_.keys(state.byId).length).to.equal(0);
      expect(_.keys(state.byCid).length).to.equal(0);
      expect(_.keys(state.find).length).to.equal(1);
      expect(state.find[queryKey].data.length).to.equal(0);

      var state2 = reducer(state, action2);
      expect(_.keys(state2.byId).length).to.equal(1);
      expect(_.keys(state2.byCid).length).to.equal(1);
      expect(_.keys(state2.find).length).to.equal(1);
      expect(state2.find[queryKey].data.length).to.equal(1);

      var state3 = reducer(state2, action3);
      expect(_.keys(state3.byId).length).to.equal(1);
      expect(_.keys(state3.byCid).length).to.equal(2);
      expect(_.keys(state3.find).length).to.equal(1);
      expect(state3.find[queryKey].data.length).to.equal(2);

      var state4 = reducer(state3, action4);
      expect(_.keys(state4.byId).length).to.equal(2);
      expect(_.keys(state4.byCid).length).to.equal(2);
      expect(_.keys(state4.find).length).to.equal(1);
      expect(state4.find[queryKey].data.length).to.equal(2);
    });
  });

  describe("add/find duplicate id sequence", function() {
    var action1, action2, action3, action4, query;

    // NOTE: this is a real use case, and happens with a model is fetched by id
    // while a collection of the same model is also being fetched.  If the model
    // exists in both datasets, it will have the same id but a different cid. The
    // first cid comes from when the model was requested directly in the findOne/fetch
    // action.  The second cid is created once the call to the collection endpoint
    // returns with a list of models (using the find/fetchAll action

    beforeEach(function() {
      query = {};

      action1 = {
        type: ActionTypes.add(modelName),
        query: query,
        payload: {
          id: '1',
          cid: 'c1'
        }
      };

      action2 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query,
        payload: {
          data: [{
            id: '1',
            cid: 'c2'
          }]
        }
      };
    });

    it("should merge results with the same id", function() {
      var queryKey = JSON.stringify(query);

      var state = reducer(null, action1);
      expect(_.keys(state.byId).length).to.equal(1);
      expect(_.keys(state.byCid).length).to.equal(1);
      expect(_.keys(state.find).length).to.equal(0);

      var state2 = reducer(state, action2);
      expect(_.keys(state2.byId).length).to.equal(1);
      expect(_.keys(state2.byCid).length).to.equal(1);
      expect(_.keys(state2.find).length).to.equal(1);
      expect(state2.find[queryKey].data.length).to.equal(1);
    });
  });

  describe("find/add duplicate id sequence", function() {
    var action1, action2, action3, action4, query;

    // NOTE: this is a real use case, and happens with a model is fetched by id
    // while a collection of the same model is also being fetched.  If the model
    // exists in both datasets, it will have the same id but a different cid. The
    // first cid comes from when the model was requested directly in the findOne/fetch
    // action.  The second cid is created once the call to the collection endpoint
    // returns with a list of models (using the find/fetchAll action

    beforeEach(function() {
      query = {};

      action1 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query,
        payload: {
          data: [{
            id: '1',
            cid: 'c1'
          }]
        }
      };

      action2 = {
        type: ActionTypes.add(modelName),
        query: query,
        payload: {
          id: '1',
          cid: 'c2'
        }
      };
    });

    it("should merge results with the same id", function() {
      var queryKey = JSON.stringify(query);

      var state = reducer(null, action1);
      expect(_.keys(state.byId).length).to.equal(1);
      expect(_.keys(state.byCid).length).to.equal(1);
      expect(_.keys(state.find).length).to.equal(1);
      expect(state.find[queryKey].data.length).to.equal(1);

      var state2 = reducer(state, action2);
      expect(_.keys(state2.byId).length).to.equal(1);
      expect(_.keys(state2.byCid).length).to.equal(1);
      expect(_.keys(state2.find).length).to.equal(1);
      expect(state2.find[queryKey].data.length).to.equal(1);
    });
  });

});

