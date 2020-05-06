import assert from "assert";
import { LinkedList } from "../linkedlist";
// unshift
describe.each([
  [
    [1, 2, 3], // initial data
    [0], // unshift data
    [0, 1, 2, 3] // result
  ],
  [
    ["a", "b", "c"], // initial data
    ["d", "e", "f"], // unshift data
    ["f", "e", "d", "a", "b", "c"] // result
  ],
])("unshift %p %p", (
  init: Array<any>,
  arg: Array<any>,
  result: Array<any>
) => {
  test("unshift", () => {
    const list = new LinkedList(...init);
    arg.forEach((a) => {
      list.unshift(a);
    });
    result.forEach((r, i) => {
      const entry = list.get(i);
      assert.strictEqual(entry?.data, r);
    });
  });
});

// pop
describe.each([
  [
    [1, 2, 3], // initial data
    [3], //poped
    [1, 2] // result
  ],
])("pop %p %p", (
  init: Array<any>,
  poped: Array<any>,
  result: Array<any>
) => {
  test("pop", () => {
    const list = new LinkedList(...init);
    const entry = list.pop();
    assert.deepStrictEqual(entry?.data, poped[0]);
    result.forEach((r, i) => {
      const entry = list.get(i);
      assert.strictEqual(entry?.data, r);
    });
    
  });
});

// remove
describe.each([
  [
    [1, 2, 3], // initial data
    1, // remove index
    [1, 3] // result
  ],
  [
    [1, 2, 3, 4, 5, 6, 7], // initial data
    4, // remove index
    [1, 2, 3, 4, 6, 7] // result
  ],
])("remove %p %p", (
  init: Array<any>,
  removeIndex: number,
  result: Array<any>
) => {
  test("remove", () => {
    const list = new LinkedList(...init);
    const entry = list.get(removeIndex);
    if (!entry) {
      assert.fail("null pointer");
    }
    list.remove(entry);
    result.forEach((r, i) => {
      const entry = list.get(i);
      assert.strictEqual(entry?.data, r);
    });
    let e = list.tail;
    for (let i=list.length-1; i>=0; i--) {
      assert.strictEqual(e?.data, result[i]);
      e = e?.prev || null;
    }
  });
});