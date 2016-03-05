var expect = require('chai').expect;
var _ = require('lodash');
var defaultHooks = require('../../../src/defaultHooks');

describe('default-hooks', function() {

  it("should have the correct sequence of hooks", function() {
    var keys = _.keys(defaultHooks);
    expect(keys.length).to.equal(9);
    expect(defaultHooks).to.deep.equal({
      connect: true,
      models: true,
      collections: true,
      reducerBlueprints: true,
      reducers: true,
      redux: true,
      dialog: true,
      actionBlueprints: true,
      actions: true
    });
    expect(keys[0]).to.equal('connect');
    expect(keys[1]).to.equal('models');
    expect(keys[2]).to.equal('collections');
    expect(keys[3]).to.equal('reducerBlueprints');
    expect(keys[4]).to.equal('reducers');
    expect(keys[5]).to.equal('redux');
    expect(keys[6]).to.equal('dialog');
    expect(keys[7]).to.equal('actionBlueprints');
    expect(keys[8]).to.equal('actions');
  });

});

