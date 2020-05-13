"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var ioredis_1 = __importDefault(require("ioredis"));
var RedisCache = /** @class */ (function() {
  function RedisCache(opts) {
    this.redis = new ioredis_1.default(opts);
    this.identify = opts.identify;
    this.serialize = opts.serialize;
    this.deserialize = opts.deserialize;
  }
  RedisCache.prototype.put = function(key, value, options) {
    var identify =
      (options === null || options === void 0 ? void 0 : options.identify) ||
      this.identify;
    var serialize =
      (options === null || options === void 0 ? void 0 : options.serialize) ||
      this.serialize;
    var time = options === null || options === void 0 ? void 0 : options.ttl;
    var k = identify ? identify(key) : key + "";
    var v = serialize ? serialize(value) : value + "";
    if (time) {
      return this.redis.set(k, v, "ex", time);
    }
    return this.redis.set(k, v);
  };
  RedisCache.prototype.get = function(key, options) {
    return __awaiter(this, void 0, void 0, function() {
      var identify, k, v, deserialize, value;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            identify =
              (options === null || options === void 0
                ? void 0
                : options.identify) || this.identify;
            k = identify ? identify(key) : key + "";
            return [4 /*yield*/, this.redis.get(k)];
          case 1:
            v = _a.sent();
            if (v == null) {
              return [2 /*return*/, v];
            }
            deserialize =
              (options === null || options === void 0
                ? void 0
                : options.deserialize) || this.deserialize;
            value = deserialize ? deserialize(v) : v;
            return [2 /*return*/, value];
        }
      });
    });
  };
  RedisCache.prototype.delete = function(key, options) {
    var identify =
      (options === null || options === void 0 ? void 0 : options.identify) ||
      this.identify;
    var k = identify ? identify(key) : key + "";
    return this.redis.del(k);
  };
  RedisCache.prototype.clearAll = function() {
    return __awaiter(this, void 0, void 0, function() {
      var keys, dels, _i, keys_1, key;
      return __generator(this, function(_a) {
        switch (_a.label) {
          case 0:
            return [4 /*yield*/, this.redis.keys("*")];
          case 1:
            keys = _a.sent();
            dels = [];
            for (_i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
              key = keys_1[_i];
              dels.push(this.redis.del(key));
            }
            return [2 /*return*/, Promise.all(dels)];
        }
      });
    });
  };
  RedisCache.prototype.close = function() {
    return this.redis.quit();
  };
  return RedisCache;
})();
exports.RedisCache = RedisCache;
