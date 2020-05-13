"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var ioredis_1 = tslib_1.__importDefault(require("ioredis"));
var RedisCache = /** @class */ (function () {
    function RedisCache(opts) {
        this.redis = new ioredis_1.default(opts);
        this.identify = opts.identify;
        this.serialize = opts.serialize;
        this.deserialize = opts.deserialize;
    }
    RedisCache.prototype.put = function (key, value, options) {
        var identify = (options === null || options === void 0 ? void 0 : options.identify) || this.identify;
        var serialize = (options === null || options === void 0 ? void 0 : options.serialize) || this.serialize;
        var time = options === null || options === void 0 ? void 0 : options.ttl;
        var k = identify ? identify(key) : key + "";
        var v = serialize ? serialize(value) : value + "";
        if (time) {
            return this.redis.set(k, v, "ex", time);
        }
        return this.redis.set(k, v);
    };
    RedisCache.prototype.get = function (key, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var identify, k, v, deserialize, value;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        identify = (options === null || options === void 0 ? void 0 : options.identify) || this.identify;
                        k = identify ? identify(key) : key + "";
                        return [4 /*yield*/, this.redis.get(k)];
                    case 1:
                        v = _a.sent();
                        if (v == null) {
                            return [2 /*return*/, v];
                        }
                        deserialize = (options === null || options === void 0 ? void 0 : options.deserialize) || this.deserialize;
                        value = deserialize ? deserialize(v) : v;
                        return [2 /*return*/, value];
                }
            });
        });
    };
    RedisCache.prototype.delete = function (key, options) {
        var identify = (options === null || options === void 0 ? void 0 : options.identify) || this.identify;
        var k = identify ? identify(key) : key + "";
        return this.redis.del(k);
    };
    RedisCache.prototype.clearAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var keys, dels, _i, keys_1, key;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redis.keys("*")];
                    case 1:
                        keys = _a.sent();
                        dels = [];
                        for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                            key = keys_1[_i];
                            dels.push(this.redis.del(key));
                        }
                        return [2 /*return*/, Promise.all(dels)];
                }
            });
        });
    };
    RedisCache.prototype.close = function () {
        return this.redis.quit();
    };
    return RedisCache;
}());
exports.RedisCache = RedisCache;
