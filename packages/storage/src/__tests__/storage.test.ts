import assert from "assert";
import { Storage, LRUCache } from "../storage";

describe.each([
  [
    [
      ["test", 2],
      ["aaa", 3],
      ["bbb", 4],
    ], // initial data
    { storage: new LRUCache({ limit: 3 }) }, // option
    [["ccc", 6]], // new data
    [
      ["aaa", 3],
      ["bbb", 4],
      ["ccc", 6],
    ], // result
  ],
])("storage", (data, option, newData, result) => {
  test("put", async () => {
    const storage = new Storage(option);
    data.forEach((d) => {
      storage.store(d[0], d[1]);
    });
    newData.forEach((d) => {
      storage.store(d[0], d[1]);
    });
    for (const d of result) {
      const r = await storage.get(d[0]);
      assert.strictEqual(r, d[1]);
    }
  });
});
