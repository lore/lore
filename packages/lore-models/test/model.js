import chai, {expect} from "chai";
import spies from 'chai-spies';
import nock from "nock";
import assign from "lodash.assign";
import {Model} from "../src/index";
import sync from "../src/sync";

//setup chai plugins
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

describe('#model', () => {
  let modelName = '';
  let _Model = null;

  beforeEach(() => {
    modelName = 'foo';

    //mock get
    nock(API_ROOT)
      .persist()
      .get(`/${modelName}`)
      .reply(200, {
        success: true
      });

    //mock post
    nock(API_ROOT)
      .persist()
      .post(`/${modelName}`)
      .reply(201, function( uri, requestBody ) {
        return JSON.stringify({newProp: "TestSaved"});
      });

    //mock update
    nock(API_ROOT)
      .persist()
      .put(`/${modelName}/1234`)
      .reply(200, function( uri, requestBody ) {
        return JSON.stringify({newProp: "TestUpdated"});
      });

    //mock delete
    nock(API_ROOT)
      .persist()
      .delete(`/${modelName}/1234`)
      .reply(200, {
        success: true
      });

    _Model = Model.extend({
      urlRoot: urlRoot(modelName)
    });
  });

  describe('given an object, it will correctly extend prototype properties', ()=> {
    it('will extend prototype properties', ()=> {

      const model = Model.extend({
        testProto: true
      });

      //test prototype properties
      const modifiedModel = new model();
      expect(modifiedModel.testProto).to.eq(true);
    });

    it('will extend static properties', ()=> {
      let model = Model.extend({}, {
        testStatic: true
      });

      //test static properties
      expect(model.testStatic).to.eq(true);

    });

  });
  describe('given an object, it will allow you to set the values', ()=> {
    it('using an object of key/value pairs', ()=> {
      const model = Model.extend({
        testProto: true
      });

      //test prototype properties
      const modifiedModel = new model();
      modifiedModel.set({test: true});

      expect(modifiedModel.attributes.test).to.eq(true);
    });
    it('using a key and value', ()=> {
      const model = Model.extend({
        testProto: true
      });

      //test prototype properties
      const modifiedModel = new model();
      modifiedModel.set("anotherTest", false);
      expect(modifiedModel.attributes.anotherTest).to.eq(false);
    });
  });

  describe('given a model name', () => {
    it('it will call the appropriate endpoint', ( done ) => {
      const model = new _Model();
      model.fetch().then(( result ) => {
        expect(result.success).to.eq(true);
        done();
      });
    });

    it('it will make a POST request when saving the model without an ID', ( done ) => {
      const model = new _Model();
      model.attributes.newProp = "Test";
      model.save().then(( result ) => {
        expect(result.newProp).to.equal("TestSaved");
        done();
      });
    });

    it('it will make a PUT request when saving the model with an ID', ( done ) => {
      const model = new _Model({id: "1234"});
      model.attributes.newProp = "Test";
      model.save().then(( result ) => {
        expect(result.newProp).to.equal("TestUpdated");
        done();
      });
    });

    it('it will make a DELETE request when destroying the model with an ID', ( done ) => {
      const model = new _Model({id: "1234"});

      model.destroy().then(( result )=> {
        expect(result.success).to.eq(true);
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
      modelName = 'foo';

      spy = chai.spy(newSync);

      _Model = Model.extend({
        urlRoot: urlRoot(modelName),
        sync: spy
      });
    });

    it('it will call the appropriate endpoint', ( done ) => {
      const model = new _Model();
      model.fetch().then(( result ) => {
        expect(result.success).to.eq(true);
        expect(spy).to.have.been.called.once;
        done();
      });

    });
  });
});
