"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SpecterResponse = /** @class */ (function () {
    function SpecterResponse(headers, body) {
        this.headers = headers;
        this.body = body;
    }
    SpecterResponse.prototype.setStatus = function (status) {
        this.status = status;
    };
    SpecterResponse.prototype.setNextReqs = function () {
        var reqs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            reqs[_i] = arguments[_i];
        }
        this.headers = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, this.headers), { "x-specter-next-reqs": reqs.map(function (req) { return req.toString(); }).join("__sep__") });
        this.nextReqs = reqs;
    };
    SpecterResponse.prototype.appendHeader = function (key, value) {
        var _a;
        this.headers = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, this.headers), (_a = {}, _a[key] = value, _a));
    };
    SpecterResponse.prototype.setError = function (error) {
        this.error = error;
    };
    SpecterResponse.prototype.getNextReqs = function () {
        return this.nextReqs;
    };
    SpecterResponse.parse = function (res) {
        var parsed = JSON.parse(res);
        var response = new SpecterResponse(parsed.headers, parsed.body);
        response.setStatus(parsed.status);
        return response;
    };
    SpecterResponse.prototype.toString = function () {
        return JSON.stringify({
            status: this.status,
            headers: this.headers,
            body: this.body,
        });
    };
    return SpecterResponse;
}());
exports.default = SpecterResponse;
