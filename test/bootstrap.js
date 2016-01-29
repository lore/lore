//var Promise = require('bluebird');
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
