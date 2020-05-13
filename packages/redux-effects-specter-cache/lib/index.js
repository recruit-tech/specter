"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var storage_1 = require("@specter/storage");
var redux_effects_specter_1 = require("@specter/redux-effects-specter");
var cacheInstance = null;
function createCache(cacheOption) {
    if (cacheInstance !== null)
        return cacheInstance;
    cacheInstance = new storage_1.LRUCache(cacheOption);
    return cacheInstance;
}
// CAUTION: this function expected to call after the createCache execudes in once.
// MEMO: this can call from outside middleware, and reset a cache data.
function resetCacheData() {
    var cache = createCache();
    cache.clearAll();
}
exports.resetCacheData = resetCacheData;
function reduxEffectsSpecterCache(_a) {
    var _this = this;
    var _b = _a.middlewareOption, middlewareOption = _b === void 0 ? {} : _b, _c = _a.cacheOption, cacheOption = _c === void 0 ? {} : _c;
    var excludes = middlewareOption.excludes, fromCache = middlewareOption.fromCache, toCache = middlewareOption.toCache, resetCache = middlewareOption.resetCache;
    var cache = createCache(cacheOption);
    return function (_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            if (action.type !== redux_effects_specter_1.SPECTER)
                return next(action);
            var _a = action.payload, type = _a.type, service = _a.service, query = _a.query;
            if (resetCache && resetCache(action, getState())) {
                resetCacheData();
            }
            if (type !== "read" ||
                (type === "read" && excludes && excludes.includes(service))) {
                return next(action);
            }
            var cacheKey = "@@$" + redux_effects_specter_1.SPECTER + "/" + service + "@@" + JSON.stringify(query, 
            // refs: https://github.com/recruit-tech/redux-effects-fetchr-cache/pull/3
            Object.keys(query).sort());
            // MEMO: you can resolve cache from action and state of store.
            //       if you dont set the fromCache function, always called cache.get function.
            var manualCache = fromCache && fromCache(action, getState());
            return (function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var cacheResult;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(!fromCache || manualCache)) return [3 /*break*/, 2];
                            return [4 /*yield*/, cache.get(cacheKey)];
                        case 1:
                            cacheResult = _a.sent();
                            if (cacheResult) {
                                return [2 /*return*/, cacheResult];
                            }
                            _a.label = 2;
                        case 2: 
                        // CAUTION: this middleware depend on the "@specter/redux-effects-specter"
                        //          and "@specter/redux-effects-specter" is expected next applied self.
                        return [2 /*return*/, next(action).then(function (resp) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var manualCache;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            manualCache = toCache && toCache(action, getState());
                                            if (!(!toCache || manualCache)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, cache.put(cacheKey, resp)];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/, resp];
                                    }
                                });
                            }); })];
                    }
                });
            }); })();
        }; };
    };
}
exports.default = reduxEffectsSpecterCache;
