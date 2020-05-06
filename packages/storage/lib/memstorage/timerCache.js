"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entry = /** @class */ (function () {
    function Entry(data, expiredSec) {
        this.expiredAt = Date.now() + expiredSec * 1000;
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
        var expiredSec = (options === null || options === void 0 ? void 0 : options.expiredSec) || Infinity;
        var entry = new Entry(value, expiredSec);
        if (expiredSec !== Infinity) {
            var timer = setTimeout(function (key) {
                _this.delete(key);
            }, expiredSec, key);
            this.timers.set(key, timer);
        }
        this.cache.set(key, entry);
        if (this.limit < this.cache.size) {
            var tail = Array.from(this.cache.keys())[this.cache.size - 1];
            this.cache.delete(tail);
        }
    };
    TimerCache.prototype.get = function (key) {
        var entry = this.cache.get(key);
        if (entry == null) {
            return null;
        }
        return entry.get();
    };
    TimerCache.prototype.delete = function (key) {
        this.cache.delete(key);
        var timeout = this.timers.get(key);
        if (timeout) {
            clearTimeout(timeout);
        }
        ;
        this.timers.delete(key);
    };
    TimerCache.prototype.clearAll = function () {
        var _this = this;
        var keys = Array.from(this.cache.keys());
        keys.forEach(function (key) {
            _this.delete(key);
        });
    };
    return TimerCache;
}());
exports.TimerCache = TimerCache;
