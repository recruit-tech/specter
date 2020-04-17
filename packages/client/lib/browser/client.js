"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_1 = __importDefault(require("./response"));
var querystring_1 = require("querystring");
var unfetch_1 = __importDefault(require("unfetch"));
var specter_1 = require("@specter/specter");
// refs: https://github.com/developit/unfetch/issues/46
// refs: https://github.com/developit/unfetch/issues/46#issuecomment-552492844
var fetch = unfetch_1.default.bind(window);
var DefaultContentType = "application/json; charset=utf-8";
var SpecterClient = /** @class */ (function () {
    function SpecterClient(options) {
        var _a;
        this.base = options.base;
        this.fetchOptions = options.fetchOptions;
        this.validateStatus = (_a = options.validateStatus) !== null && _a !== void 0 ? _a : (function (_s) { return true; });
    }
    SpecterClient.prototype.createPath = function (request) {
        var q = querystring_1.stringify(request.query);
        var query = q ? "?" + q : "";
        var path = this.base + "/" + request.resource + query;
        return path;
    };
    SpecterClient.prototype.executeRequest = function (method, request) {
        return __awaiter(this, void 0, void 0, function () {
            var path, body, _a, defaultHeaders, options, head, response, json, h, headers, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        path = this.createPath(request);
                        body = request.body ? JSON.stringify(request.body) : null;
                        _a = this.fetchOptions, defaultHeaders = _a.headers, options = __rest(_a, ["headers"]);
                        head = __assign(__assign({}, defaultHeaders), request.headers);
                        if (body && !head["Content-Type"]) {
                            head["Content-Type"] = DefaultContentType;
                        }
                        return [4 /*yield*/, (method === "GET" || method === "HEAD"
                                ? fetch(path, __assign({ method: method, headers: head }, options))
                                : fetch(path, __assign({ method: method, headers: head, body: body }, options)))];
                    case 1:
                        response = _b.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        json = _b.sent();
                        h = response.headers;
                        headers = [].slice.call(h.entries()).reduce(function (acc, _a) {
                            var _b;
                            var key = _a[0], value = _a[1];
                            return (__assign(__assign({}, acc), (_b = {}, _b[key] = value, _b)));
                        }, {});
                        result = new response_1.default(headers, json);
                        if (!this.validateStatus(response.status)) {
                            throw new specter_1.SpecterNetworkError("validationStatus failure: " + response.statusText, response.status, response.statusText, request, result);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SpecterClient.prototype.execute = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!request.method) {
                    throw new Error("Request method is not found.");
                }
                return [2 /*return*/, this.executeRequest(request.method, request)];
            });
        });
    };
    SpecterClient.prototype.create = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("POST", request)];
            });
        });
    };
    SpecterClient.prototype.read = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("GET", request)];
            });
        });
    };
    SpecterClient.prototype.update = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("PUT", request)];
            });
        });
    };
    SpecterClient.prototype.delete = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("DELETE", request)];
            });
        });
    };
    SpecterClient.prototype.exists = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.createPath(request);
                        return [4 /*yield*/, fetch(path, __assign({ method: "HEAD", headers: request.headers, body: JSON.stringify(request.body) }, this.fetchOptions))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.ok];
                }
            });
        });
    };
    return SpecterClient;
}());
exports.default = SpecterClient;
