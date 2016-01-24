var expect = require('chai').expect;
var definition = require('../../../../../lib/hooks/dialog/index');
var DialogManager = require('../../../../../lib/hooks/dialog/dialogManager');
var Hook = require('../../../../../lib/Hook');

describe('hooks#dialog#dialogManager', function() {
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

