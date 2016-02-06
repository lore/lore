var expect = require('chai').expect;
var _ = require('lodash');
var generateProperties = require('../../../../../src/hooks/collections/generateProperties');
var Hook = require('../../../../../src/Hook');

describe('hooks#collections#generateProperties', function() {

  it('should remove properties from /models/:definition', function() {
    var properties = generateProperties('todo', {
      modelDefinition: {
        properties: {
          url: 'https://models.todo/todos'
        }
      }
    });
    expect(properties).to.deep.equal({
      url: '/todo'
    });
  });

  it('should remove properties from /config/models', function() {
    var properties = generateProperties('todo', {
      modelsConfig: {
        properties: {
          url: 'https://config.models/todos'
        }
      }
    });
    expect(properties).to.deep.equal({
      url: '/todo'
    });
  });

  it('should create url from apiRoot and pluralize settings', function() {
    var properties = generateProperties('todo', {
      modelsConfig: {
        apiRoot: 'https://config.collections',
        pluralize: true
      }
    });
    expect(properties.url).to.equal('https://config.collections/todos');
  });

  it('config/collections takes priority over config/models', function() {
    var properties = generateProperties('todo', {
      collectionsConfig: {
        apiRoot: 'https://config.collections'
      },
      modelsConfig: {
        apiRoot: 'https://config.models'
      }
    });
    expect(properties.url).to.equal('https://config.collections/todo');
  });

  it('models/todo takes priority over config/collections', function() {
    var properties = generateProperties('todo', {
      collectionsConfig: {
        apiRoot: 'https://config.collections'
      },
      modelDefinition: {
        apiRoot: 'https://models.todo'
      }
    });
    expect(properties.url).to.equal('https://models.todo/todo');
  });

  it('collections/todo takes priority over models/todo', function() {
    var properties = generateProperties('todo', {
      collectionDefinition: {
        apiRoot: 'https://collections.todo'
      },
      modelDefinition: {
        apiRoot: 'https://models.todo'
      }
    });
    expect(properties.url).to.equal('https://collections.todo/todo');
  });

  it('should pass properties along', function() {
    var properties = generateProperties('todo', {
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
      url: '/todo'
    });
  });

});

