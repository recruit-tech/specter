"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = __importDefault(require("assert"));
var storage_1 = require("../storage");
describe.each([
    [
        [
            ["test", 2],
            ["aaa", 3],
            ["bbb", 4]
        ],
        { storage: new storage_1.LRUCache({ limit: 3 }) },
        [["ccc", 6]],
        [
            ["aaa", 3],
            ["bbb", 4],
            ["ccc", 6]
        ] // result
    ]
])("storage", function (data, option, newData, result) {
    test("put", function () {
        var storage = new storage_1.Storage(option);
        data.forEach(function (d) {
            storage.store(d[0], d[1]);
        });
        newData.forEach(function (d) {
            storage.store(d[0], d[1]);
        });
        result.forEach(function (d) {
            assert_1.default.strictEqual(storage.get(d[0]), d[1]);
        });
    });
});
