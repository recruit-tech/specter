"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_1 = require("url");
var request_1 = tslib_1.__importDefault(require("./request"));
var DefaultContentType = "application/json";
var Specter = /** @class */ (function () {
    function Specter() {
    }
    Specter.registerService = function (service) {
        Specter.services.set(service.name, service);
    };
    Specter.getService = function (name) {
        var service = Specter.services.get(name);
        if (!service) {
            throw new Error("Service not found: " + name);
        }
        return service;
    };
    Specter.isRegistered = function (name) {
        return Specter.services.has(name);
    };
    Specter.createMiddleware = function (options) {
        var _this = this;
        return function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var url, resource, request, service, response, headers, _i, _a, _b, key, value, e_1;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        if (!req.url) {
                            throw new Error("req url is not found.");
                        }
                        url = url_1.parse(req.url);
                        if (!url.pathname) {
                            throw new Error("url pathname is not found.");
                        }
                        resource = url.pathname.substr(1).split("/").shift();
                        if (!resource) {
                            throw new Error("resource is not found.");
                        }
                        request = new request_1.default(resource, req);
                        if (!Specter.isRegistered(request.resource)) {
                            throw new Error("resource: " + resource + " is not registered.");
                        }
                        service = Specter.getService(request.resource);
                        return [4 /*yield*/, service.execute(request)];
                    case 1:
                        response = _c.sent();
                        headers = {};
                        for (_i = 0, _a = Object.entries(response.headers); _i < _a.length; _i++) {
                            _b = _a[_i], key = _b[0], value = _b[1];
                            headers[key] = value;
                        }
                        headers["Content-Type"] = DefaultContentType;
                        headers["access-control-expose-headers"] = Object.keys(headers).join(",");
                        res.writeHead(response.status || 200, headers);
                        if (response.body) {
                            res.end(JSON.stringify(response.body));
                        }
                        else {
                            res.end(null);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _c.sent();
                        next(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    };
    Specter.services = new Map();
    return Specter;
}());
exports.default = Specter;
