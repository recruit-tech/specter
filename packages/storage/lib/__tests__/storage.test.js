"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = tslib_1.__importDefault(require("assert"));
var storage_1 = require("../storage");
describe.each([
    [
        [
            ["test", 2],
            ["aaa", 3],
            ["bbb", 4],
        ],
        { storage: new storage_1.LRUCache({ limit: 3 }) },
        [["ccc", 6]],
        [
            ["aaa", 3],
            ["bbb", 4],
            ["ccc", 6],
        ], // result
    ],
])("storage", function (data, option, newData, result) {
    test("put", function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var storage, _i, result_1, d, r;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    storage = new storage_1.Storage(option);
                    data.forEach(function (d) {
                        storage.store(d[0], d[1]);
                    });
                    newData.forEach(function (d) {
                        storage.store(d[0], d[1]);
                    });
                    _i = 0, result_1 = result;
                    _a.label = 1;
                case 1:
                    if (!(_i < result_1.length)) return [3 /*break*/, 4];
                    d = result_1[_i];
                    return [4 /*yield*/, storage.get(d[0])];
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
