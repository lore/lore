var expect = require('chai').expect;
var _ = require('lodash');
var generateProperties = require('../../../../../src/hooks/models/generateProperties');
var Hook = require('../../../../../src/Hook');

describe('hooks#collections#generateProperties', function() {

  it('should create urlRoot from apiRoot and pluralize settings', function() {
    var properties = generateProperties('todo', {
      config: {
        apiRoot: 'https://config.models',
        pluralize: true
      }
    });
    expect(properties.urlRoot).to.equal('https://config.models/todos');
  });

  it('models/todo takes priority over config/models', function() {
    var properties = generateProperties('todo', {
      config: {
        apiRoot: 'https://config.models'
      },
      definition: {
        apiRoot: 'https://models.todo'
      }
    });
    expect(properties.urlRoot).to.equal('https://models.todo/todo');
  });

  it('should pass properties along', function() {
    var properties = generateProperties('todo', {
      config: {
        properties: {
          propA: 'a'
        }
      },
      definition: {
        properties: {
          propB: 'b'
        }
      }
    });
    expect(properties).to.deep.equal({
      propA: 'a',
      propB: 'b',
      urlRoot: '/todo'
    });
  });

});

