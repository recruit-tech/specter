"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerCache = exports.LRUCache = exports.Storage = void 0;
var lrucache_1 = require("./memstorage/lrucache");
Object.defineProperty(exports, "LRUCache", { enumerable: true, get: function () { return lrucache_1.LRUCache; } });
var timercache_1 = require("./memstorage/timercache");
Object.defineProperty(exports, "TimerCache", { enumerable: true, get: function () { return timercache_1.TimerCache; } });
var Storage = /** @class */ (function () {
    function Storage(opts) {
        this.storage = opts.storage || new lrucache_1.LRUCache({});
    }
    Storage.prototype.store = function (key, value, opts) {
        this.storage.put(key, value, opts);
    };
    Storage.prototype.get = function (key, opts) {
        return this.storage.get(key, opts);
    };
    Storage.prototype.purge = function (key) {
        this.storage.delete(key);
    };
    Storage.prototype.purgeAll = function () {
        this.storage.clearAll();
    };
    return Storage;
}());
exports.Storage = Storage;
