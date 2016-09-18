var expect = require('chai').expect;
var definition = require('../src/index');
var DialogManager = require('../src/dialogManager');
var Hook = require('lore-utils').Hook;

describe('dialogManager', function() {
  var lore = null;
  var defaultConfig = null;
  var hook = null;

  beforeEach(function() {
    hook = new Hook(definition);
    defaultConfig = hook.defaults.dialog;

    lore = {
      config: {
        dialog: defaultConfig,
        router: {
          history: function() {}
        }
      },
      store: function() {}
    };
  });

  it('should have the correct fields', function(done) {
    var dialogManager = DialogManager(lore);
    dialogManager.show(function() {
      return function() {
        return "hello";
      }
    }, function(instance) {
      expect(instance.type.name).to.equal('Provider');
      done();
    });
  });

});

