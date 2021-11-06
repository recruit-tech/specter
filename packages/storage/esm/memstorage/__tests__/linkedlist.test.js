import { __spreadArray } from "tslib";
import assert from "assert";
import { LinkedList } from "../linkedlist";
// unshift
describe.each([
    [
        [1, 2, 3],
        [0],
        [0, 1, 2, 3], // result
    ],
    [
        ["a", "b", "c"],
        ["d", "e", "f"],
        ["f", "e", "d", "a", "b", "c"], // result
    ],
])("unshift %p %p", function (init, arg, result) {
    test("unshift", function () {
        var list = new (LinkedList.bind.apply(LinkedList, __spreadArray([void 0], init, false)))();
        arg.forEach(function (a) {
            list.unshift(a);
        });
        result.forEach(function (r, i) {
            var entry = list.get(i);
            assert.strictEqual(entry === null || entry === void 0 ? void 0 : entry.data, r);
        });
    });
});
// pop
describe.each([
    [
        [1, 2, 3],
        [3],
        [1, 2], // result
    ],
])("pop %p %p", function (init, poped, result) {
    test("pop", function () {
        var list = new (LinkedList.bind.apply(LinkedList, __spreadArray([void 0], init, false)))();
        var entry = list.pop();
        assert.deepStrictEqual(entry === null || entry === void 0 ? void 0 : entry.data, poped[0]);
        result.forEach(function (r, i) {
            var entry = list.get(i);
            assert.strictEqual(entry === null || entry === void 0 ? void 0 : entry.data, r);
        });
    });
});
// remove
describe.each([
    [
        [1, 2, 3],
        1,
        [1, 3], // result
    ],
    [
        [1, 2, 3, 4, 5, 6, 7],
        4,
        [1, 2, 3, 4, 6, 7], // result
    ],
])("remove %p %p", function (init, removeIndex, result) {
    test("remove", function () {
        var list = new (LinkedList.bind.apply(LinkedList, __spreadArray([void 0], init, false)))();
        var entry = list.get(removeIndex);
        if (!entry) {
            assert.fail("null pointer");
        }
        list.remove(entry);
        result.forEach(function (r, i) {
            var entry = list.get(i);
            assert.strictEqual(entry === null || entry === void 0 ? void 0 : entry.data, r);
        });
        var e = list.tail;
        for (var i = list.length - 1; i >= 0; i--) {
            assert.strictEqual(e === null || e === void 0 ? void 0 : e.data, result[i]);
            e = (e === null || e === void 0 ? void 0 : e.prev) || null;
        }
    });
});
