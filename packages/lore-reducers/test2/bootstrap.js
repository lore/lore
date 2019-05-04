// ---------------------------------------------------------------------
// Mock out all file loaders so we don't need physical files for testing
// ---------------------------------------------------------------------
var loaderHelper = require('../../lore/test/helpers/loaderHelper');

beforeEach(function() {
  loaderHelper.init();
});

afterEach(function() {
  loaderHelper.restore();
});

// --------------------------------------------------
// Set up Nock to block and mock out network requests
// --------------------------------------------------
// var nock = require('nock');
//
// before(function(){
//   nock.disableNetConnect();
// });
//
// afterEach(function(){
//   nock.cleanAll();
// });
//
// after(function(){
//   nock.restore();
// });
