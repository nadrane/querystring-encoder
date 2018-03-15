const set = require("lodash.set");
const has = require("lodash.has");
const get = require("lodash.get");

class Decoder {
  constructor(queryString) {
    this.nextChar = 0;
    this.queryString = queryString;
    this.nesting = "";
    this.result = {};
  }

  peek() {
    return this.queryString[this.nextChar];
  }

  pop() {
    const nextChar = this.queryString[this.nextChar];
    this.nextChar++;
    return nextChar;
  }

  parseKey() {
    let key = "";
    while (this.peek() && this.peek() !== "=") {
      key += this.pop();
    }
    return key;
  }

  parseValue() {
    let value = "";
    while (this.peek() && this.peek() !== "&") {
      value += this.pop();
    }
    return value;
  }

  parse() {
    // while characters are left
    while (this.peek()) {
      const key = this.parseKey();
      if (this.peek() !== "=") {
        throw new Error("a value is expected after a key");
      }
      this.pop(); // consume the =
      const value = this.parseValue();
      if (has(this.result, key)) {
        const newValue = [get(this.result, key)];
        newValue.push(value);
        set(this.result, key, newValue);
      } else {
        set(this.result, key, value);
      }
      console.dir(this.result, { depth: 4, colors: true });
      if (this.peek()) {
        this.pop(); // consume the &
      }
    }
    return this.result;
  }
}

module.exports = function(queryString) {
  const decoder = new Decoder(queryString);
  return decoder.parse(queryString);
};
