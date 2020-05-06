"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// This Storage uses lru cache algorithm.
var linkedlist_1 = require("./linkedlist");
var LRUCache = /** @class */ (function () {
    function LRUCache(opts) {
        this.lruCacheList = new linkedlist_1.LinkedList();
        this.lruCacheMap = new Map();
        this.timers = new Map();
        this.limit = (opts === null || opts === void 0 ? void 0 : opts.limit) || 100;
    }
    LRUCache.prototype.put = function (key, value, options) {
        var _this = this;
        var entry = this.lruCacheMap.get(key);
        if (entry) {
            this.lruCacheList.remove(entry);
        }
        var newEntry = this.lruCacheList.unshift({ key: key, value: value });
        this.lruCacheMap.set(key, newEntry);
        if (this.lruCacheList.length > this.limit) {
            var entry_1 = this.lruCacheList.pop();
            if (entry_1) {
                this.lruCacheMap.delete(entry_1.data.key);
            }
        }
        var expiredSec = (options === null || options === void 0 ? void 0 : options.expiredSec) || Infinity;
        if (expiredSec !== Infinity) {
            var timer = setTimeout(function (key) {
                _this.delete(key);
            }, expiredSec * 1000, key);
            this.timers.set(key, timer);
        }
    };
    LRUCache.prototype.get = function (key) {
        var entry = this.lruCacheMap.get(key);
        if (!entry) {
            return null;
        }
        this.lruCacheList.remove(entry);
        this.lruCacheList.unshift(entry.data);
        return entry.data.value;
    };
    LRUCache.prototype.delete = function (key) {
        var entry = this.lruCacheMap.get(key);
        if (!entry) {
            return entry;
        }
        this.lruCacheList.remove(entry);
        this.lruCacheMap.delete(key);
        var timeout = this.timers.get(key);
        if (timeout) {
            clearTimeout(timeout);
        }
        ;
        this.timers.delete(key);
    };
    LRUCache.prototype.clearAll = function () {
        var _this = this;
        var keys = Array.from(this.lruCacheMap.keys());
        keys.forEach(function (key) {
            _this.delete(key);
        });
    };
    return LRUCache;
}());
exports.LRUCache = LRUCache;
