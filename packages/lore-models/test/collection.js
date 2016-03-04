import chai,{expect} from "chai";
import {default as chaiAsPromised} from "chai-as-promised";
import spies from 'chai-spies';
import nock from "nock";
import {Collection,Model} from "../src/index";
import sync from "../src/sync";

//setup chai plugins
chai.use(chaiAsPromised);
chai.use(spies);

const API_ROOT = 'https://example.com';

before(function() {
  nock.disableNetConnect();
});

afterEach(function() {
  nock.cleanAll();
});

function urlRoot( path ) {
  return `${API_ROOT}/${path}`;
}

describe('#collection', () => {
  let collectionName = '';
  let _Collection = null;
  let _Model = Model.extend({
    idAttribute: "_id"
  });

  beforeEach(() => {
    collectionName = 'foo';

    nock(API_ROOT)
      .persist()
      .get(`/${collectionName}`)
      .reply(200, [{success: true}]);
  });

  describe('given a new model, it will override the default model', ()=> {
    beforeEach(() => {
      _Collection = Collection.extend({
        url: urlRoot(collectionName),
        model: _Model
      });
    });

    it('it will have a property called model, with a matching type', () => {
      const collection = new _Collection();
      expect(collection.model).to.eq(_Model);
    });

  });

  describe('given an object, it will correctly extend prototype properties', ()=> {
    it('will extend prototype properties', ()=> {

      const collection = Collection.extend({
        testProto: true
      });

      //test prototype properties
      const modifiedCollection = new collection();
      expect(modifiedCollection.testProto).to.eq(true);
    });

    it('will extend static properties', ()=> {
      const collection = Collection.extend({}, {
        testStatic: true
      });

      //test static properties
      expect(collection.testStatic).to.eq(true);

    })
  });

  describe('given a url', () => {
    beforeEach(() => {
      _Collection = Collection.extend({
        url: urlRoot(collectionName),
        model: _Model
      });

    });

    it('it will call the appropriate endpoint', ( done ) => {
      const collection = new _Collection();
      collection.fetch().then(( result ) => {
        let model = result[0];
        expect(model.attributes.success).to.eq(true);
        done();
      });
    });

    it('the resulting response will be a collection of models, matching the type specified', ( done ) => {
      const collection = new _Collection();
      collection.fetch().then(( result ) => {
        let model = result[0];
        expect(model instanceof _Model).to.eq(true);
        done();
      });
    });
  });

  describe('given a sync method', () => {
    let spy;

    function newSync() {
      return sync.apply(this, arguments);
    }

    beforeEach(() => {

      spy = chai.spy(newSync);

      _Collection = Collection.extend({
        url: urlRoot(collectionName),
        sync: spy
      });
    });

    it('it will call the appropriate endpoint', ( done ) => {
      const collection = new _Collection();
      collection.fetch().then(( result ) => {
        expect(result[0].attributes.success).to.eq(true);
        expect(spy).to.have.been.called.once;
        done();
      });
    });
  });
});
