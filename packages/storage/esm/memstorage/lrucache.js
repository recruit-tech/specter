/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This Storage uses lru cache algorithm.
import { LinkedList } from "./linkedlist";
var LRUCache = /** @class */ (function () {
    function LRUCache(opts) {
        this.lruCacheList = new LinkedList();
        this.lruCacheMap = new Map();
        this.timers = new Map();
        this.limit = (opts === null || opts === void 0 ? void 0 : opts.limit) || 100;
        this.identify = opts === null || opts === void 0 ? void 0 : opts.identify;
        this.serialize = opts === null || opts === void 0 ? void 0 : opts.serialize;
    }
    LRUCache.prototype.put = function (key, value, options) {
        var _this = this;
        var identify = (options === null || options === void 0 ? void 0 : options.identify) || this.identify;
        var k = identify ? identify(key) : key + "";
        var entry = this.lruCacheMap.get(k);
        if (entry) {
            this.lruCacheList.remove(entry);
        }
        var newEntry = this.lruCacheList.unshift({ key: k, value: value });
        this.lruCacheMap.set(k, newEntry);
        if (this.lruCacheList.length > this.limit) {
            var entry_1 = this.lruCacheList.pop();
            if (entry_1) {
                this.lruCacheMap.delete(entry_1.data.key);
            }
        }
        var ttl = (options === null || options === void 0 ? void 0 : options.ttl) || Infinity;
        if (ttl !== Infinity) {
            var timer = setTimeout(function (k) {
                _this.delete(k);
            }, ttl, k);
            this.timers.set(k, timer);
        }
        return Promise.resolve(null);
    };
    LRUCache.prototype.get = function (key, options) {
        var identify = (options === null || options === void 0 ? void 0 : options.identify) || this.identify;
        var k = identify ? identify(key) : key + "";
        var entry = this.lruCacheMap.get(k);
        if (!entry) {
            return Promise.resolve(null);
        }
        this.lruCacheList.remove(entry);
        this.lruCacheList.unshift(entry.data);
        return Promise.resolve(entry.data.value);
    };
    LRUCache.prototype.delete = function (key, options) {
        var identify = (options === null || options === void 0 ? void 0 : options.identify) || this.identify;
        var k = identify ? identify(key) : key + "";
        this._delete(k);
        return Promise.resolve(null);
    };
    LRUCache.prototype._delete = function (k) {
        var entry = this.lruCacheMap.get(k);
        if (!entry) {
            return Promise.resolve(entry);
        }
        this.lruCacheList.remove(entry);
        this.lruCacheMap.delete(k);
        var timeout = this.timers.get(k);
        if (timeout) {
            clearTimeout(timeout);
        }
        this.timers.delete(k);
    };
    LRUCache.prototype.clearAll = function () {
        var _this = this;
        var keys = Array.from(this.lruCacheMap.keys());
        keys.forEach(function (key) {
            _this._delete(key);
        });
        return Promise.resolve(null);
    };
    return LRUCache;
}());
export { LRUCache };
