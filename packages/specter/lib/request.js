"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XSPECTER_METHOD = "x-specter-method";
var SpecterRequest = /** @class */ (function () {
    function SpecterRequest(resource, req) {
        var _a;
        this.resource = resource;
        this.method = req.method;
        this.query = ((_a = req) === null || _a === void 0 ? void 0 : _a.query) || {};
        this.headers = req.headers || {};
        this.body = req.body || {};
        if (!this.body) {
            throw new Error("Not Supported Yet.");
        }
        if (this.headers[XSPECTER_METHOD]) {
            var xspecterMethod = this.headers[XSPECTER_METHOD];
            this.method = xspecterMethod;
        }
        this.req = req;
    }
    SpecterRequest.parseRequest = function (req) {
        var parsed = JSON.parse(req);
        return new SpecterRequest(parsed.resource, {
            method: parsed.method,
            headers: parsed.headers,
            query: parsed.query,
            body: parsed.body,
        });
    };
    SpecterRequest.prototype.toString = function () {
        return JSON.stringify({
            resource: this.resource,
            headers: this.headers,
            query: this.query,
            body: this.body,
            method: this.method,
        });
    };
    return SpecterRequest;
}());
exports.default = SpecterRequest;
