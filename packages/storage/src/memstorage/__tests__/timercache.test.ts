import assert from "assert";
import { TimerCache } from "../timercache";

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
])("timercache", (data, option, newData, result) => {
  test("put", async () => {
    const timercache = new TimerCache(option);
    data.forEach(d => {
      timercache.put(d[0], d[1]);
    });
    newData.forEach(d => {
      timercache.put(d[0], d[1]);
    });
    for (const d of result) {
      const r = await timercache.get(d[0]);
      assert.strictEqual(r, d[1]);
    }
  });
});
