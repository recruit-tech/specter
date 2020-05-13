"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var lrucache_1 = require("../lrucache");
describe("misc", function() {
  test("misc", function(done) {
    var init = [
      ["test", 1],
      ["a", "b"],
      [1, "c"]
    ]; // initial data [[k, v], [k, v]]
    var options = { limit: 3 };
    var lrucache = new lrucache_1.LRUCache(options);
    init.forEach(function(arg) {
      lrucache.put(arg[0], arg[1]);
    });
    var v = lrucache.get("test");
    assert_1.default.strictEqual(v, 1);
    v = lrucache.get("a");
    assert_1.default.strictEqual(v, "b");
    v = lrucache.get(1);
    assert_1.default.strictEqual(v, "c");
    lrucache.put("111", 222);
    v = lrucache.get("test");
    assert_1.default.strictEqual(v, null);
    lrucache.put("111", 223);
    v = lrucache.get("111");
    assert_1.default.strictEqual(v, 223);
    v = lrucache.get("a");
    assert_1.default.strictEqual(v, "b");
    lrucache.put(1, 2, { expiredSec: 1 });
    setTimeout(function() {
      v = lrucache.get(1);
      assert_1.default.strictEqual(v, null);
      lrucache.clearAll();
      done();
    }, 2000);
  });
});
