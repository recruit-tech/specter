"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var lrucache_1 = require("../lrucache");
describe.each([
    [
        [
            [1, 2],
            [2, 3],
            [3, 4]
        ],
        { limit: 3 },
        [[5, 6]],
        [
            [2, 3],
            [3, 4],
            [5, 6]
        ] // result
    ]
])("lrucache", function (data, option, newData, result) {
    test("put", function () {
        var lrucache = new lrucache_1.LRUCache(option);
        data.forEach(function (d) {
            lrucache.put(d[0], d[1]);
        });
        newData.forEach(function (d) {
            lrucache.put(d[0], d[1]);
        });
        result.forEach(function (d) {
            assert_1.default.strictEqual(lrucache.get(d[0]), d[1]);
        });
    });
});
describe.each([
    [
        [
            [1, 2],
            [2, 3],
            [3, 4]
        ],
        { limit: 3 },
        [[2]],
        [
            [1, 2],
            [3, 4]
        ] // result
    ]
])("lrucache", function (data, option, del, result) {
    test("delete", function () {
        var lrucache = new lrucache_1.LRUCache(option);
        data.forEach(function (d) {
            lrucache.put(d[0], d[1]);
        });
        del.forEach(function (d) {
            lrucache.delete(d[0]);
            assert_1.default.strictEqual(lrucache.get(d[0]), null);
        });
        result.forEach(function (d) {
            assert_1.default.strictEqual(lrucache.get(d[0]), d[1]);
        });
    });
});
describe.each([
    [
        [
            [1, 2],
            [2, 3],
            [3, 4]
        ],
        { limit: 3 },
        [
            [1, null],
            [3, null]
        ] // result
    ]
])("lrucache", function (data, option, result) {
    test("clearall", function () {
        var lrucache = new lrucache_1.LRUCache(option);
        data.forEach(function (d) {
            lrucache.put(d[0], d[1]);
        });
        lrucache.clearAll();
        result.forEach(function (d) {
            assert_1.default.strictEqual(lrucache.get(d[0]), d[1]);
        });
    });
});
