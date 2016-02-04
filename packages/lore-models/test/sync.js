import {expect} from "chai";
import sync from "../src/sync";
import {type} from "../src/constants";

describe('#sync', () => {

  it("should throw an error if no URL is provided in the model or the options", ()=> {
    expect(sync.bind(null, type.GET, {}, {})).to.throw(Error);
  })

});
