var expect = require('chai').expect;
var definition = require('../src/index');
var Hook = require('lore-utils').Hook;
import get from '../src/actions/get';
import update from '../src/actions/update';

describe('defaults', function() {

  it('should have the correct fields', function() {
    var hook = new Hook(definition);
    var defaultConfig = {
      auth: {
        blueprints: {
          get,
          update
        },
        modelName: null,
        actionName: null,
        reducerName:null
      }
    };
    expect(hook.defaults).to.deep.equal(defaultConfig);
  });

});

