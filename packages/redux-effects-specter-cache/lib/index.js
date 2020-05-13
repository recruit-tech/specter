"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
            return (function () { return __awaiter(_this, void 0, void 0, function () {
                var cacheResult;
                var _this = this;
                return __generator(this, function (_a) {
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
                        return [2 /*return*/, next(action).then(function (resp) { return __awaiter(_this, void 0, void 0, function () {
                                var manualCache;
                                return __generator(this, function (_a) {
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
