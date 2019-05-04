var expect = require('chai').expect;
var _ = require('lodash');
var generateProperties = require('../src/generateProperties');
var Hook = require('@lore/utils').Hook;
var defaultConnection = require('./defaultConnection');

function url(route) {
  return defaultConnection.apiRoot +route;
}

describe('generateProperties', function() {

  it('should remove properties from /models/:definition', function() {
    var properties = generateProperties('todo', {
      connection: _.extend({}, defaultConnection),
      modelDefinition: {
        properties: {
          url: 'https://models.todo/todos'
        }
      }
    });
    expect(properties).to.deep.equal({
      url: defaultConnection.apiRoot + '/todos'
    });
  });

  it('should remove properties from /config/models', function() {
    var properties = generateProperties('todo', {
      connection: _.extend({}, defaultConnection),
      modelsConfig: {
        properties: {
          url: 'https://config.models/todos'
        }
      }
    });
    expect(properties).to.deep.equal({
      url: defaultConnection.apiRoot + '/todos'
    });
  });

  it('should create url from apiRoot and pluralize settings', function() {
    var properties = generateProperties('todo', {
      connection: _.extend({}, defaultConnection),
      modelsConfig: {
        apiRoot: 'https://config.collections',
        pluralize: true
      }
    });
    expect(properties.url).to.equal('https://config.collections/todos');
  });

  it('config/collections takes priority over config/models', function() {
    var properties = generateProperties('todo', {
      connection: _.extend({}, defaultConnection),
      collectionsConfig: {
        apiRoot: 'https://config.collections'
      },
      modelsConfig: {
        apiRoot: 'https://config.models'
      }
    });
    expect(properties.url).to.equal('https://config.collections/todos');
  });

  it('models/todo takes priority over config/collections', function() {
    var properties = generateProperties('todo', {
      connection: _.extend({}, defaultConnection),
      collectionsConfig: {
        apiRoot: 'https://config.collections'
      },
      modelDefinition: {
        apiRoot: 'https://models.todo'
      }
    });
    expect(properties.url).to.equal('https://models.todo/todos');
  });

  it('collections/todo takes priority over models/todo', function() {
    var properties = generateProperties('todo', {
      connection: _.extend({}, defaultConnection),
      collectionDefinition: {
        apiRoot: 'https://collections.todo'
      },
      modelDefinition: {
        apiRoot: 'https://models.todo'
      }
    });
    expect(properties.url).to.equal('https://collections.todo/todos');
  });

  it('should pass properties along', function() {
    var properties = generateProperties('todo', {
      connection: _.extend({}, defaultConnection),
      collectionsConfig: {
        properties: {
          propA: 'a'
        }
      },
      collectionDefinition: {
        properties: {
          propB: 'b'
        }
      }
    });
    expect(properties).to.deep.equal({
      propA: 'a',
      propB: 'b',
      url: defaultConnection.apiRoot + '/todos'
    });
  });

});

