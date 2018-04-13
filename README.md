Encode nested objects into query strings in a readable AND safe format.

# Usage

### Encoding

```js
const query = {
  a: {
    b: { c: ["good", "best"] },
    b2: "hi"
  },
  page: "10"
};

encode(query);
>>> "a.b.c=good&a.b.c=best&a.b2=hi&page=10"
```

### Decoding

```js
const queryString = "a.b.c=good&a.b.c=best&a.b2=hi&page=10"

decode(queryString)
{
  a: {
    b: { c: ["good", "best"] },
    b2: "hi"
  },
  page: "10"
};
```
