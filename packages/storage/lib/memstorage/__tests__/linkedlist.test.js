"use strict";
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var linkedlist_1 = require("../linkedlist");
// unshift
describe.each([
  [
    [1, 2, 3],
    [0],
    [0, 1, 2, 3] // result
  ],
  [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["f", "e", "d", "a", "b", "c"] // result
  ]
])("unshift %p %p", function(init, arg, result) {
  test("unshift", function() {
    var list = new (linkedlist_1.LinkedList.bind.apply(
      linkedlist_1.LinkedList,
      __spreadArrays([void 0], init)
    ))();
    arg.forEach(function(a) {
      list.unshift(a);
    });
    result.forEach(function(r, i) {
      var entry = list.get(i);
      assert_1.default.strictEqual(
        entry === null || entry === void 0 ? void 0 : entry.data,
        r
      );
    });
  });
});
// pop
describe.each([
  [
    [1, 2, 3],
    [3],
    [1, 2] // result
  ]
])("pop %p %p", function(init, poped, result) {
  test("pop", function() {
    var list = new (linkedlist_1.LinkedList.bind.apply(
      linkedlist_1.LinkedList,
      __spreadArrays([void 0], init)
    ))();
    var entry = list.pop();
    assert_1.default.deepStrictEqual(
      entry === null || entry === void 0 ? void 0 : entry.data,
      poped[0]
    );
    result.forEach(function(r, i) {
      var entry = list.get(i);
      assert_1.default.strictEqual(
        entry === null || entry === void 0 ? void 0 : entry.data,
        r
      );
    });
  });
});
// remove
describe.each([
  [
    [1, 2, 3],
    1,
    [1, 3] // result
  ],
  [
    [1, 2, 3, 4, 5, 6, 7],
    4,
    [1, 2, 3, 4, 6, 7] // result
  ]
])("remove %p %p", function(init, removeIndex, result) {
  test("remove", function() {
    var list = new (linkedlist_1.LinkedList.bind.apply(
      linkedlist_1.LinkedList,
      __spreadArrays([void 0], init)
    ))();
    var entry = list.get(removeIndex);
    if (!entry) {
      assert_1.default.fail("null pointer");
    }
    list.remove(entry);
    result.forEach(function(r, i) {
      var entry = list.get(i);
      assert_1.default.strictEqual(
        entry === null || entry === void 0 ? void 0 : entry.data,
        r
      );
    });
    var e = list.tail;
    for (var i = list.length - 1; i >= 0; i--) {
      assert_1.default.strictEqual(
        e === null || e === void 0 ? void 0 : e.data,
        result[i]
      );
      e = (e === null || e === void 0 ? void 0 : e.prev) || null;
    }
  });
});
