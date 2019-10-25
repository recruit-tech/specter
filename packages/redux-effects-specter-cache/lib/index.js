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
function reduxEffectsSpecterCache(_a) {
    var _b = _a.middlewareOption, middlewareOption = _b === void 0 ? {} : _b, cacheOption = _a.cacheOption;
    var excludes = middlewareOption.excludes, fromCache = middlewareOption.fromCache, toCache = middlewareOption.toCache, resetCache = middlewareOption.resetCache;
    var cache = createCache(cacheOption);
    return function (_a) {
        var getState = _a.getState, dispatch = _a.dispatch;
        return function (next) { return function (action) {
            if (action.type !== redux_effects_specter_1.SPECTER) {
                return next(action);
            }
        }; };
    };
}
exports.default = reduxEffectsSpecterCache;
