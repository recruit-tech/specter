import assert from "assert";
import { LRUCache } from "../lrucache";

describe.each([
  [
    [
      [1, 2],
      [2, 3],
      [3, 4]
    ], // initial data
    { limit: 3 }, // option
    [[5, 6]], // new data
    [
      [2, 3],
      [3, 4],
      [5, 6]
    ] // result
  ]
])("lrucache", (data, option, newData, result) => {
  test("put", () => {
    const lrucache = new LRUCache(option);
    data.forEach(d => {
      lrucache.put(d[0], d[1]);
    });
    newData.forEach(d => {
      lrucache.put(d[0], d[1]);
    });
    result.forEach(d => {
      assert.strictEqual(lrucache.get(d[0]), d[1]);
    });
  });
});

describe.each([
  [
    [
      [1, 2],
      [2, 3],
      [3, 4]
    ], // initial data
    { limit: 3 }, // option
    [[2]], // delete data
    [
      [1, 2],
      [3, 4]
    ] // result
  ]
])("lrucache", (data, option, del, result) => {
  test("delete", () => {
    const lrucache = new LRUCache(option);
    data.forEach(d => {
      lrucache.put(d[0], d[1]);
    });
    del.forEach(d => {
      lrucache.delete(d[0]);
      assert.strictEqual(lrucache.get(d[0]), null);
    });
    result.forEach(d => {
      assert.strictEqual(lrucache.get(d[0]), d[1]);
    });
  });
});

describe.each([
  [
    [
      [1, 2],
      [2, 3],
      [3, 4]
    ], // initial data
    { limit: 3 }, // option
    [
      [1, null],
      [3, null]
    ] // result
  ]
])("lrucache", (data, option, result) => {
  test("clearall", () => {
    const lrucache = new LRUCache(option);
    data.forEach(d => {
      lrucache.put(d[0], d[1]);
    });
    lrucache.clearAll();
    result.forEach(d => {
      assert.strictEqual(lrucache.get(d[0]), d[1]);
    });
  });
});
