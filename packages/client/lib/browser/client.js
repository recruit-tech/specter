"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var response_1 = tslib_1.__importDefault(require("./response"));
var querystring_1 = require("querystring");
var unfetch_1 = tslib_1.__importDefault(require("unfetch"));
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
        this.fallbackMethod = options.fallbackMethod;
    }
    SpecterClient.prototype.createPath = function (request) {
        var q = querystring_1.stringify(request.query);
        var query = q ? "?" + q : "";
        var path = this.base + "/" + request.resource + query;
        return path;
    };
    SpecterClient.prototype.executeRequest = function (m, request) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var path, body, defaultHeaders, options, head, shouldFallback, method, response, json, _b, h, entries, headers, result;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        path = this.createPath(request);
                        body = request.body ? JSON.stringify(request.body) : null;
                        defaultHeaders = (_a = this.fetchOptions) === null || _a === void 0 ? void 0 : _a.headers;
                        options = tslib_1.__assign({}, this.fetchOptions);
                        delete options["headers"];
                        head = tslib_1.__assign(tslib_1.__assign({}, defaultHeaders), request.headers);
                        shouldFallback = this.shouldFallback(m);
                        method = shouldFallback ? this.fallbackMethod : m;
                        if (shouldFallback) {
                            head["X-Specter-Method"] = m;
                        }
                        if (body && !head["Content-Type"]) {
                            head["Content-Type"] = DefaultContentType;
                        }
                        return [4 /*yield*/, (method === "GET" || method === "HEAD"
                                ? fetch(path, tslib_1.__assign({ method: method, headers: head }, options))
                                : fetch(path, tslib_1.__assign({ method: method, headers: head, body: body }, options)))];
                    case 1:
                        response = _c.sent();
                        if (!(response.status === 204)) return [3 /*break*/, 2];
                        _b = {};
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, response.json()];
                    case 3:
                        _b = _c.sent();
                        _c.label = 4;
                    case 4:
                        json = _b;
                        h = response.headers.entries();
                        entries = 
                        /* eslint @typescript-eslint/ban-ts-ignore: [0] */
                        // @ts-ignore
                        typeof h.next === "function" ? Array.from(h) : [].slice.call(h);
                        headers = entries.reduce(function (acc, _a) {
                            var _b;
                            var key = _a[0], value = _a[1];
                            return (tslib_1.__assign(tslib_1.__assign({}, acc), (_b = {}, _b[key] = value, _b)));
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!request.method) {
                    throw new Error("Request method is not found.");
                }
                return [2 /*return*/, this.executeRequest(request.method, request)];
            });
        });
    };
    SpecterClient.prototype.create = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("POST", request)];
            });
        });
    };
    SpecterClient.prototype.read = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("GET", request)];
            });
        });
    };
    SpecterClient.prototype.update = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("PUT", request)];
            });
        });
    };
    SpecterClient.prototype.delete = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.executeRequest("DELETE", request)];
            });
        });
    };
    SpecterClient.prototype.exists = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var path, response;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.createPath(request);
                        return [4 /*yield*/, fetch(path, tslib_1.__assign({ method: "HEAD", headers: request.headers, body: JSON.stringify(request.body) }, this.fetchOptions))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.ok];
                }
            });
        });
    };
    SpecterClient.prototype.shouldFallback = function (method) {
        return this.fallbackMethod && (method === "PUT" || method === "DELETE");
    };
    return SpecterClient;
}());
exports.default = SpecterClient;
