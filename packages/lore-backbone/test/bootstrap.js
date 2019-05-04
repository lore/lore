var nock = require('nock');

// -------------------------------------------
// Set up Nock for valid/invalid user requests
// -------------------------------------------

before(function(){
  nock.disableNetConnect();
});

afterEach(function(){
  nock.cleanAll();
});

after(function(){
  nock.restore();
});
