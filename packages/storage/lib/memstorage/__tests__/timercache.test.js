"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var timercache_1 = require("../timercache");
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
])("timercache", function (data, option, newData, result) {
    test("put", function () {
        var timercache = new timercache_1.TimerCache(option);
        data.forEach(function (d) {
            timercache.put(d[0], d[1]);
        });
        newData.forEach(function (d) {
            timercache.put(d[0], d[1]);
        });
        result.forEach(function (d) {
            assert_1.default.strictEqual(timercache.get(d[0]), d[1]);
        });
    });
});
