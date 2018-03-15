const { expect } = require("chai");
const { encode, decode } = require("./index");

describe("encode", () => {
  it("should treat unested objects the same way that querystring.stringify() would", () => {
    expect(encode({ name: "nick", job: "programmer" })).to.equal("name=nick&job=programmer");
  });
  it("allow multiple values to be set for a given key", () => {
    expect(encode({ name: ["nick"], job: ["programmer", "software"] })).to.equal(
      "name=nick&job=programmer&job=software"
    );
  });
  it("should allow for objects to be nested", () => {
    expect(encode({ filter: { programmer: "true", employed: "false" }, page: "10" })).to.equal(
      "filter.programmer=true&filter.employed=false&page=10"
    );
  });
  it("should allow nested objects to contain array", () => {
    expect(encode({ filter: { programmer: ["good", "best"] }, page: "10" })).to.equal(
      "filter.programmer=good&filter.programmer=best&page=10"
    );
  });
  it("should allow for objects nested to arbitrary depth", () => {
    expect(encode({ a: { b: { c: ["good", "best"] }, b2: "hi" }, page: "10" })).to.equal(
      "a.b.c=good&a.b.c=best&a.b2=hi&page=10"
    );
  });
});

describe.only("decode", () => {
  it("return an object of key/value pairs", () => {
    expect(decode("name=nick&job=programmer")).to.deep.equal({ name: "nick", job: "programmer" });
  });
  it("return an array of values if the same key appears multiple times", () => {
    expect(decode("name=nick&name=programmer")).to.deep.equal({ name: ["nick", "programmer"] });
  });
  it("considers the . to indicate object nesting", () => {
    expect(decode("filter.programmer=true&filter.employed=false&page=10")).to.deep.equal({
      filter: { programmer: "true", employed: "false" },
      page: "10"
    });
  });
  it.only("should allow for objects nested to arbitrary depth", () => {
    expect(decode("a.b.c=good&a.b.c=best&a.b2=hi&page=10")).to.deep.equal({
      a: { b: { c: ["good", "best"] }, b2: "hi" },
      page: "10"
    });
  });
});
