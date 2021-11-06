"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = (0, tslib_1.__importDefault)(require("assert"));
var timercache_1 = require("../timercache");
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
        ], // result
    ],
])("timercache", function (data, option, newData, result) {
    test("put", function () { return (0, tslib_1.__awaiter)(void 0, void 0, void 0, function () {
        var timercache, _i, result_1, d, r;
        return (0, tslib_1.__generator)(this, function (_a) {
            switch (_a.label) {
                case 0:
                    timercache = new timercache_1.TimerCache(option);
                    data.forEach(function (d) {
                        timercache.put(d[0], d[1]);
                    });
                    newData.forEach(function (d) {
                        timercache.put(d[0], d[1]);
                    });
                    _i = 0, result_1 = result;
                    _a.label = 1;
                case 1:
                    if (!(_i < result_1.length)) return [3 /*break*/, 4];
                    d = result_1[_i];
                    return [4 /*yield*/, timercache.get(d[0])];
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
