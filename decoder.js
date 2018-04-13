const set = require("lodash.set");
const has = require("lodash.has");
const get = require("lodash.get");

module.exports = function decode(queryString) {
  const queryStringPieces = queryString.split("&");
  const decodedQueryString = {};

  for (const piece of queryStringPieces) {
    let [key, value] = piece.split("=");
    value = value || "";
    if (has(decodedQueryString, key)) {
      const currentValueForKey = get(decodedQueryString, key);
      if (!Array.isArray(currentValueForKey)) {
        set(decodedQueryString, key, [currentValueForKey, value]);
      } else {
        currentValueForKey.push(value);
      }
    } else {
      set(decodedQueryString, key, value);
    }
  }
  return decodedQueryString;
};
