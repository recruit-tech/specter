"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storage_1 = require("../storage");
var MemStorage = /** @class */ (function() {
  function MemStorage(opts) {
    this.shortlife = new storage_1.LRUCache(opts.shortlife);
    this.longlife = new storage_1.TimerCache(opts.longlife);
  }
  MemStorage.prototype.put = function(key, value, options) {
    var life =
      (options === null || options === void 0 ? void 0 : options.life) ||
      "shortlife";
    if (life === "shortlife") {
      return this.shortlife.put(key, value, options);
    }
    return this.longlife.put(key, value, options);
  };
  MemStorage.prototype.get = function(key, options) {
    var life =
      (options === null || options === void 0 ? void 0 : options.life) ||
      "shortlife";
    if (life === "shortlife") {
      return this.shortlife.get(key);
    }
    return this.longlife.get(key);
  };
  MemStorage.prototype.delete = function(key) {
    this.shortlife.delete(key);
    this.longlife.delete(key);
  };
  MemStorage.prototype.clearAll = function() {
    this.shortlife.clearAll();
    this.longlife.clearAll();
  };
  return MemStorage;
})();
exports.MemStorage = MemStorage;
