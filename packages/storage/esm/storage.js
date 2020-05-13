import { LRUCache } from "./memstorage/lrucache";
import { TimerCache } from "./memstorage/timercache";
var Storage = /** @class */ (function () {
    function Storage(opts) {
        this.storage = opts.storage || new LRUCache({});
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
export { Storage };
export { LRUCache, TimerCache };
