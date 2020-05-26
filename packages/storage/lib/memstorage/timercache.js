"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerCache = exports.Entry = void 0;
var Entry = /** @class */ (function () {
    function Entry(data, ttl) {
        this.expiredAt = Date.now() + ttl;
        this.data = data;
    }
    Entry.prototype.get = function () {
        if (this.expiredAt > Date.now()) {
            return this.data;
        }
        return null;
    };
    return Entry;
}());
exports.Entry = Entry;
var TimerCache = /** @class */ (function () {
    function TimerCache(opts) {
        this.cache = new Map();
        this.limit = (opts === null || opts === void 0 ? void 0 : opts.limit) || 100;
        this.timers = new Map();
    }
    TimerCache.prototype.put = function (key, value, options) {
        var _this = this;
        var ttl = (options === null || options === void 0 ? void 0 : options.ttl) || Infinity;
        var entry = new Entry(value, ttl);
        if (ttl !== Infinity) {
            var timer = setTimeout(function (key) {
                _this.delete(key);
            }, ttl, key);
            this.timers.set(key, timer);
        }
        this.cache.set(key, entry);
        if (this.limit < this.cache.size) {
            var head = this.cache.keys().next().value;
            this.cache.delete(head);
        }
        return Promise.resolve(null);
    };
    TimerCache.prototype.get = function (key) {
        var entry = this.cache.get(key);
        if (entry == null) {
            return Promise.resolve(null);
        }
        return Promise.resolve(entry.get());
    };
    TimerCache.prototype.delete = function (key) {
        this.cache.delete(key);
        var timeout = this.timers.get(key);
        if (timeout) {
            clearTimeout(timeout);
        }
        this.timers.delete(key);
        return Promise.resolve(null);
    };
    TimerCache.prototype.clearAll = function () {
        var _this = this;
        var keys = Array.from(this.cache.keys());
        keys.forEach(function (key) {
            _this.delete(key);
        });
        return Promise.resolve(null);
    };
    return TimerCache;
}());
exports.TimerCache = TimerCache;
