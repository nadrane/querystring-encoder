const { escape } = require("querystring");

function encode(queryObj, nesting = "") {
  let queryString = "";
  const pairs = Object.entries(queryObj).map(([key, val]) => {
    if (Array.isArray(val)) {
      return val.map(subVal => [nesting + key, subVal].map(escape).join("=")).join("&");
    } else if (typeof val === "object") {
      return encode(val, nesting + `${key}.`);
    } else {
      return [nesting + key, val].map(escape).join("=");
    }
  });
  return pairs.join("&");
}

module.exports = encode;
