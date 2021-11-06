"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var request_1 = (0, tslib_1.__importDefault)(require("@specter/specter/lib/request"));
var SpecterResponse = /** @class */ (function () {
    function SpecterResponse(headers, body) {
        this.headers = headers;
        this.body = body;
    }
    SpecterResponse.prototype.getNextReqs = function () {
        var nextReqs = this.headers["x-specter-next-reqs"];
        var reqs = nextReqs
            .split("__sep__")
            .map(function (req) { return request_1.default.parseRequest(req); });
        return reqs;
    };
    SpecterResponse.parse = function (res) {
        var parsed = JSON.parse(res);
        var response = new SpecterResponse(parsed.headers, parsed.body);
        return response;
    };
    SpecterResponse.prototype.toString = function () {
        return JSON.stringify({
            headers: this.headers,
            body: this.body,
        });
    };
    return SpecterResponse;
}());
exports.default = SpecterResponse;
