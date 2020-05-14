import { __awaiter, __generator } from "tslib";
import { LRUCache } from "@specter/storage";
import { SPECTER } from "@specter/redux-effects-specter";
var cacheInstance = null;
function createCache(cacheOption) {
    if (cacheInstance !== null)
        return cacheInstance;
    cacheInstance = new LRUCache(cacheOption);
    return cacheInstance;
}
// CAUTION: this function expected to call after the createCache execudes in once.
// MEMO: this can call from outside middleware, and reset a cache data.
export function resetCacheData() {
    return __awaiter(this, void 0, void 0, function () {
        var cache;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cache = createCache();
                    return [4 /*yield*/, cache.clearAll()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export default function reduxEffectsSpecterCache(_a) {
    var _this = this;
    var _b = _a.middlewareOption, middlewareOption = _b === void 0 ? {} : _b, _c = _a.cacheOption, cacheOption = _c === void 0 ? {} : _c;
    var excludes = middlewareOption.excludes, fromCache = middlewareOption.fromCache, toCache = middlewareOption.toCache, resetCache = middlewareOption.resetCache;
    var cache = createCache(cacheOption);
    return function (_a) {
        var getState = _a.getState;
        return function (next) { return function (action) {
            if (action.type !== SPECTER)
                return next(action);
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, type, service, query, cacheKey, shouldFromCache, cacheResult, resp, shouldToCache;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = action.payload, type = _a.type, service = _a.service, query = _a.query;
                            if (!(resetCache && resetCache(action, getState()))) return [3 /*break*/, 2];
                            return [4 /*yield*/, resetCacheData()];
                        case 1:
                            _b.sent();
                            _b.label = 2;
                        case 2:
                            if (type !== "read" ||
                                (type === "read" && excludes && excludes.includes(service))) {
                                return [2 /*return*/, next(action)];
                            }
                            cacheKey = "@@$" + SPECTER + "/" + service + "@@" + JSON.stringify(query, 
                            // refs: https://github.com/recruit-tech/redux-effects-fetchr-cache/pull/3
                            Object.keys(query).sort());
                            shouldFromCache = fromCache && fromCache(action, getState());
                            if (!(!fromCache || shouldFromCache)) return [3 /*break*/, 4];
                            return [4 /*yield*/, cache.get(cacheKey)];
                        case 3:
                            cacheResult = _b.sent();
                            if (cacheResult) {
                                return [2 /*return*/, cacheResult];
                            }
                            _b.label = 4;
                        case 4: return [4 /*yield*/, next(action)];
                        case 5:
                            resp = (_b.sent());
                            shouldToCache = toCache && toCache(action, getState());
                            if (!(!toCache || shouldToCache)) return [3 /*break*/, 7];
                            return [4 /*yield*/, cache.put(cacheKey, resp)];
                        case 6:
                            _b.sent();
                            _b.label = 7;
                        case 7: return [2 /*return*/, resp];
                    }
                });
            }); })();
        }; };
    };
}
