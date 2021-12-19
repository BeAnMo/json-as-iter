# json-as-iter
Third time's a charm.

Converts JSON/JS objects to a iterable that yields all primitive values.

Currently filters/ignores circular references.


```js
const a = {
  a: 1,
  b: [1, {whut: [1,2,3]}, 3]
};

a.c = a.b;

[...jsonIterDF(a)] // [...{ key, value, path, parent: { current, parent } }]

```