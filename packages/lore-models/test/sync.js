import {expect} from "chai";
import sync from "../src/sync";
import {type} from "../src/constants";
import nock from "nock";

describe('#sync', () => {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  describe('with no url :(', () => {
    it("should throw an error if no URL is provided in the model or the options", ()=> {
      expect(sync.bind(null, type.GET, {}, {})).to.throw(Error);
    })
  });

  describe('when options are passed in', () => {
    describe('when headers are provided', () => {
      beforeEach(() => {
        nock('http://example.com', {
          reqheaders:{
            foobar: 'baz'
          }
        })
        .persist()
        .get('/')
        .reply(200, [{success: true}]);
      });

      it("should set headers ", ()=> {
        return sync(type.GET, {}, {url: 'http://example.com', headers:{foobar:'baz'}})
      })
    });

    describe('when other config options are provided', () => {
      beforeEach(() => {
        nock('http://example.com', {
          reqheaders:{
            'x-xsrf-token': 'token'
          }
        })
        .persist()
        .post('/')
        .reply(200, [{success: true}]);
      });

      it("should set options ", ()=> {
        return sync(type.POST, {}, {url: 'http://example.com', attrs:{param: 'value'}, headers: {'X-XSRF-TOKEN': 'token'}, xsrfHeaderName: 'X-XSRF-TOKEN'})
      })
    });
  });
});
