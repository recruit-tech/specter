"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors_1 = require("./errors");
var Service = /** @class */ (function () {
    function Service(name, config) {
        this.name = name;
        this.config = config;
    }
    Service.prototype.execute = function (req) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var check, res;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.preCheck(req)];
                    case 1:
                        check = _a.sent();
                        if (!check) {
                            return [2 /*return*/, Promise.reject(new Error("Precheck failed."))];
                        }
                        if (!(req.method === "GET" && this.read)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.read(req)];
                    case 2:
                        res = _a.sent();
                        return [3 /*break*/, 11];
                    case 3:
                        if (!(req.method === "POST" && this.create)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.create(req)];
                    case 4:
                        res = _a.sent();
                        return [3 /*break*/, 11];
                    case 5:
                        if (!(req.method === "PUT" && this.update)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.update(req)];
                    case 6:
                        res = _a.sent();
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(req.method === "DELETE" && this.delete)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.delete(req)];
                    case 8:
                        res = _a.sent();
                        return [3 /*break*/, 11];
                    case 9:
                        if (!(req.method === "HEAD" && this.exist)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.exist(req)];
                    case 10:
                        res = _a.sent();
                        _a.label = 11;
                    case 11:
                        if (!res) {
                            return [2 /*return*/, Promise.reject(errors_1.NotSupportedMethod)];
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Service.prototype.create = function (req) {
        return Promise.reject(errors_1.NotImplemented);
    };
    Service.prototype.read = function (req) {
        return Promise.reject(errors_1.NotImplemented);
    };
    Service.prototype.update = function (req) {
        return Promise.reject(errors_1.NotImplemented);
    };
    Service.prototype.delete = function (req) {
        return Promise.reject(errors_1.NotImplemented);
    };
    Service.prototype.exist = function (req) {
        return Promise.reject(errors_1.NotImplemented);
    };
    Service.prototype.preCheck = function (req) {
        return Promise.resolve(true);
    };
    return Service;
}());
exports.default = Service;
