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
    const list = new LinkedList<number>(...init);
    arg.forEach((a) => {
      list.unshift(a);
    });
    result.forEach((r, i) => {
      const entry = list.get(i);
      assert.strictEqual(entry?.data, r);
    });
  });
});