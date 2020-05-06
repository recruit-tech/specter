import assert from "assert";
import { LRUCache } from "../lrucache";

describe("misc", () => {
  test("misc", done => {
    const init = [
      ["test", 1],
      ["a", "b"],
      [1, "c"]
    ]; // initial data [[k, v], [k, v]]
    const options = { limit: 3 };
    const lrucache = new LRUCache(options);
    init.forEach(arg => {
      lrucache.put(arg[0], arg[1]);
    });
    let v = lrucache.get("test");
    assert.strictEqual(v, 1);
    v = lrucache.get("a");
    assert.strictEqual(v, "b");
    v = lrucache.get(1);
    assert.strictEqual(v, "c");
    lrucache.put("111", 222);
    v = lrucache.get("test");
    assert.strictEqual(v, null);
    lrucache.put("111", 223);
    v = lrucache.get("111");
    assert.strictEqual(v, 223);
    v = lrucache.get("a");
    assert.strictEqual(v, "b");
    lrucache.put(1, 2, { expiredSec: 1 });
    setTimeout(() => {
      v = lrucache.get(1);
      assert.strictEqual(v, null);
      lrucache.clearAll();
      done();
    }, 2000);
  });
});
