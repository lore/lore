var expect = require('chai').expect;
var _ = require('lodash');
var find = require('../../src/blueprints/find');
var ActionTypes = require('lore-utils').ActionTypes;

describe('blueprints#find', function() {
  var modelName = 'todo';
  var blueprint = find;
  var reducer = null;

  beforeEach(function() {
    reducer = blueprint(modelName);
  });

  describe("find sequence", function() {
    var action1, action2, query;

    beforeEach(function() {
      query = {};

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

    it("should add models to the dictionary", function() {
      var queryKey = JSON.stringify(query);

      var state = reducer(null, action1, { nextState: {}});
      expect(_.keys(state).length).to.equal(1);
      expect(state[queryKey].data.length).to.equal(0);

      var state2 = reducer(state, action2, {
        nextState: {
          byId: {
            '1': action2.payload.data[0]
          }
        }
      });
      expect(_.keys(state2).length).to.equal(1);
      expect(state2[queryKey].data.length).to.equal(1);
    });
  });

  describe("find/add sequence for empty query", function() {
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

    it("should add the model to the default dictionary", function() {
      var queryKey = JSON.stringify(query);

      var state = reducer(null, action1, {
        nextState: {
          byId: { },
          byCid: { }
        }
      });
      expect(_.keys(state).length).to.equal(1);
      expect(state[queryKey].data.length).to.equal(0);

      var state2 = reducer(state, action2, {
        nextState: {
          byId: {
            '1': action2.payload.data[0]
          },
          byCid: {
            'c1': action2.payload.data[0]
          }
        }
      });
      expect(_.keys(state2).length).to.equal(1);
      expect(state2[queryKey].data.length).to.equal(1);

      var state3 = reducer(state2, action3, {
        nextState: {
          byId: {
            '1': action2.payload.data[0]
          },
          byCid: {
            'c1': action2.payload.data[0],
            'c2': action3.payload
          }
        }
      });
      expect(_.keys(state3).length).to.equal(1);
      expect(state3[queryKey].data.length).to.equal(2);

      var state4 = reducer(state3, action4, {
        nextState: {
          byId: {
            '1': action2.payload.data[0],
            '2': action4.payload
          },
          byCid: {
            'c1': action2.payload.data[0],
            'c2': action4.payload
          }
        }
      });
      expect(_.keys(state4).length).to.equal(1);
      expect(state4[queryKey].data.length).to.equal(2);
    });
  });

  describe("find/add sequence for a query", function() {
    var action1, action2, action3, action4, query;

    beforeEach(function() {
      query = {
        where: {
          title: 'foo'
        }
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
            cid: 'c1',
            data: {
              title: 'foo'
            }
          }]
        }
      };

      action3 = {
        type: ActionTypes.add(modelName),
        query: query,
        payload: {
          id: null,
          cid: 'c2',
          data: {
            title: 'foo'
          }
        }
      };

      action4 = {
        type: ActionTypes.add(modelName),
        query: query,
        payload: {
          id: '2',
          cid: 'c2',
          data: {
            title: 'foo'
          }
        }
      };
    });

    it("should add the model to the default dictionary", function() {
      var queryKey = JSON.stringify(query);

      var state = reducer(null, action1, {
        nextState: {
          byId: { },
          byCid: { }
        }
      });
      expect(_.keys(state).length).to.equal(1);
      expect(state[queryKey].data.length).to.equal(0);

      var state2 = reducer(state, action2, {
        nextState: {
          byId: {
            '1': action2.payload.data[0]
          },
          byCid: {
            'c1': action2.payload.data[0]
          }
        }
      });
      expect(_.keys(state2).length).to.equal(1);
      expect(state2[queryKey].data.length).to.equal(1);

      var state3 = reducer(state2, action3, {
        nextState: {
          byId: {
            '1': action2.payload.data[0]
          },
          byCid: {
            'c1': action2.payload.data[0],
            'c2': action3.payload
          }
        }
      });
      expect(_.keys(state3).length).to.equal(1);
      expect(state3[queryKey].data.length).to.equal(2);

      var state4 = reducer(state3, action4, {
        nextState: {
          byId: {
            '1': action2.payload.data[0],
            '2': action4.payload
          },
          byCid: {
            'c1': action2.payload.data[0],
            'c2': action4.payload
          }
        }
      });
      expect(_.keys(state4).length).to.equal(1);
      expect(state4[queryKey].data.length).to.equal(2);
    });
  });

  describe("find/add sequence for multiple queries", function() {
    var action1, action2, action3, query1, query2;

    beforeEach(function() {
      query1 = {
        where: {
          title: 'foo'
        }
      };

      query2 = {
        where: {
          title: 'bar'
        }
      };

      action1 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query1,
        payload: {
          data: [{
            id: '1',
            cid: 'c1',
            data: {
              title: 'foo'
            }
          }]
        }
      };

      action2 = {
        type: ActionTypes.fetchPlural(modelName),
        query: query2,
        payload: {
          data: [{
            id: '2',
            cid: 'c2',
            data: {
              title: 'bar'
            }
          }]
        }
      };

      action3 = {
        type: ActionTypes.add(modelName),
        payload: {
          id: '3',
          cid: 'c3',
          data: {
            title: 'foo'
          }
        }
      };
    });

    it("should update each query properly", function() {
      var query1Key = JSON.stringify(query1);
      var query2Key = JSON.stringify(query2);

      var state = reducer(null, action1, {
        nextState: {
          byId: {
            '1': action1.payload.data[0]
          },
          byCid: {
            'c1': action1.payload.data[0]
          }
        }
      });
      expect(_.keys(state).length).to.equal(1);
      expect(state[query1Key].data.length).to.equal(1);
      expect(state[query2Key]).to.equal(undefined);

      var state2 = reducer(state, action2, {
        nextState: {
          byId: {
            '1': action1.payload.data[0],
            '2': action2.payload.data[0]
          },
          byCid: {
            'c1': action1.payload.data[0],
            'c2': action2.payload.data[0]
          }
        }
      });
      expect(_.keys(state2).length).to.equal(2);
      expect(state2[query1Key].data.length).to.equal(1);
      expect(state2[query2Key].data.length).to.equal(1);

      var state3 = reducer(state2, action3, {
        nextState: {
          byId: {
            '1': action1.payload.data[0],
            '2': action2.payload.data[0],
            '3': action3.payload
          },
          byCid: {
            'c1': action1.payload.data[0],
            'c2': action2.payload.data[0],
            'c3': action3.payload
          }
        }
      });
      expect(_.keys(state3).length).to.equal(2);
      expect(state3[query1Key].data.length).to.equal(2);
      expect(state3[query2Key].data.length).to.equal(1);
    });
  });

});

