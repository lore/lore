var Promise = require('bluebird');
var sinon = require('sinon');

// ---------------------------------------------------------------------
// Mock out all file loaders so we don't need physical files for testing
// ---------------------------------------------------------------------
var loaderHelper = require('./helpers/loaderHelper');

beforeEach(function() {
  loaderHelper.init();
});

afterEach(function() {
  loaderHelper.restore();
});

// --------------------------------------------------
// Set up Nock to block and mock out network requests
// --------------------------------------------------
var nock = require('nock');

before(function(){
  nock.disableNetConnect();
});

afterEach(function(){
  nock.cleanAll();
});

after(function(){
  nock.restore();
});

// -----------------------------------------------------------------
// Make sure Backbone can work on the server side
// This is needed until lore-models drop it's dependency on Backbone
// -----------------------------------------------------------------
var Backbone = require('lore-models/node_modules/backbone');
Backbone.sync = require('backbone-super-sync');

// Need to create a 'fail' method because jQuery deferred calls it that
// but bluebird (promise implemenation in backbone-super-sync) only has
// an 'error' method.
Promise.prototype.fail = Promise.prototype.error;
Promise.prototype.done = Promise.prototype.then;

// -----------------------------------------------------
// Make sure the DOM helpers are stubbed out for testing
// We need this to test the dialog component
// -----------------------------------------------------
var domHelper = require('../lib/hooks/dialog/domHelper');
var ReactTestUtils = require('react-addons-test-utils');

beforeEach(function() {
  sinon.stub(domHelper, 'renderComponentToDomElementWithId', function (domElementId, component, cb) {
    var renderer = ReactTestUtils.createRenderer();
    renderer.render(component);
    cb(renderer.getRenderOutput());
  });
});

afterEach(function() {
  domHelper.renderComponentToDomElementWithId.restore();
});
