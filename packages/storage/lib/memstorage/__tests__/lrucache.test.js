"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var assert_1 = tslib_1.__importDefault(require("assert"));
var lrucache_1 = require("../lrucache");
describe.each([
    [
        [
            [1, 2],
            [2, 3],
            [3, 4],
        ],
        { limit: 3 },
        [[5, 6]],
        [
            [2, 3],
            [3, 4],
            [5, 6],
        ],
    ],
    [
        [
            [{ foo: 1 }, 2],
            [{ foo: 2 }, 3],
            [{ foo: 3 }, 4],
        ],
        {
            limit: 3,
            identify: function (key) { return JSON.stringify(key); },
        },
        [[5, 6]],
        [
            [{ foo: 2 }, 3],
            [{ foo: 3 }, 4],
            [5, 6],
        ],
    ],
])("lrucache", function (data, option, newData, result) {
    test("put", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var lrucache, _i, result_1, d, r;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lrucache = new lrucache_1.LRUCache(option);
                    data.forEach(function (d) {
                        lrucache.put(d[0], d[1]);
                    });
                    newData.forEach(function (d) {
                        lrucache.put(d[0], d[1]);
                    });
                    _i = 0, result_1 = result;
                    _a.label = 1;
                case 1:
                    if (!(_i < result_1.length)) return [3 /*break*/, 4];
                    d = result_1[_i];
                    return [4 /*yield*/, lrucache.get(d[0])];
                case 2:
                    r = _a.sent();
                    assert_1.default.strictEqual(r, d[1]);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
describe.each([
    [
        [
            [1, 2],
            [2, 3],
            [3, 4],
        ],
        { limit: 3 },
        [[2]],
        [
            [1, 2],
            [3, 4],
        ],
    ],
])("lrucache", function (data, option, del, result) {
    test("delete", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var lrucache, _i, del_1, d, r, _a, result_2, d, r;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lrucache = new lrucache_1.LRUCache(option);
                    data.forEach(function (d) {
                        lrucache.put(d[0], d[1]);
                    });
                    _i = 0, del_1 = del;
                    _b.label = 1;
                case 1:
                    if (!(_i < del_1.length)) return [3 /*break*/, 5];
                    d = del_1[_i];
                    return [4 /*yield*/, lrucache.delete(d[0])];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, lrucache.get(d[0])];
                case 3:
                    r = _b.sent();
                    assert_1.default.strictEqual(r, null);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    _a = 0, result_2 = result;
                    _b.label = 6;
                case 6:
                    if (!(_a < result_2.length)) return [3 /*break*/, 9];
                    d = result_2[_a];
                    return [4 /*yield*/, lrucache.get(d[0])];
                case 7:
                    r = _b.sent();
                    assert_1.default.strictEqual(r, d[1]);
                    _b.label = 8;
                case 8:
                    _a++;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/];
            }
        });
    }); });
});
describe.each([
    [
        [
            [1, 2],
            [2, 3],
            [3, 4],
        ],
        { limit: 3 },
        [
            [1, null],
            [3, null],
        ],
    ],
])("lrucache", function (data, option, result) {
    test("clearall", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var lrucache, _i, result_3, d, r;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lrucache = new lrucache_1.LRUCache(option);
                    data.forEach(function (d) {
                        lrucache.put(d[0], d[1]);
                    });
                    lrucache.clearAll();
                    _i = 0, result_3 = result;
                    _a.label = 1;
                case 1:
                    if (!(_i < result_3.length)) return [3 /*break*/, 4];
                    d = result_3[_i];
                    return [4 /*yield*/, lrucache.get(d[0])];
                case 2:
                    r = _a.sent();
                    assert_1.default.strictEqual(r, d[1]);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
