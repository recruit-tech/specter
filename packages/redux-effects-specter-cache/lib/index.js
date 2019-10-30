"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lru_cache_1 = __importDefault(require("lru-cache"));
var redux_effects_specter_1 = require("@specter/redux-effects-specter");
var cacheInstance = null;
function createCache(cacheOption) {
    if (cacheInstance !== null)
        return cacheInstance;
    cacheInstance = new lru_cache_1.default(cacheOption);
    return cacheInstance;
}
// CAUTION: this function expected to call after the createCache execudes in once.
// MEMO: this can call from outside middleware, and reset a cache data.
function resetCacheData() {
    var cache = createCache();
    cache.reset();
}
exports.resetCacheData = resetCacheData;
function reduxEffectsSpecterCache(_a) {
    var _b = _a.middlewareOption, middlewareOption = _b === void 0 ? {} : _b, cacheOption = _a.cacheOption;
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
            if (type !== "read" || (type === "read" && excludes && excludes.includes(service))) {
                return next(action);
            }
            var cacheKey = "@@$" + redux_effects_specter_1.SPECTER + "/" + service + "@@" + JSON.stringify(query);
            // MEMO: you can resolve cache from action and state of store.
            //       if you dont set the fromCache function, always called cache.get function.
            var manualCache = fromCache && fromCache(action, getState());
            if (!fromCache || manualCache) {
                var cacheResult = cache.get(cacheKey);
                if (cacheResult) {
                    return Promise.resolve(cacheResult);
                }
            }
            // CAUTION: this middleware depend on the "@specter/redux-effects-specter"
            //          and "@specter/redux-effects-specter" is expected next applied self.
            return next(action).then(function (resp) {
                var manualCache = toCache && toCache(action, getState());
                if (!toCache || manualCache) {
                    cache.set(cacheKey, resp);
                }
                return resp;
            });
        }; };
    };
}
exports.default = reduxEffectsSpecterCache;
