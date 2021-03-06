"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpecterRequest = /** @class */ (function () {
    function SpecterRequest(resource, request) {
        this.resource = resource;
        this.headers = request.headers;
        this.query = request.query;
        this.body = request.body;
        this.method = request.method;
        this.req = request;
    }
    SpecterRequest.prototype.toHeader = function () {
        return JSON.stringify({
            resource: this.resource,
            headers: this.headers,
            query: this.query,
            body: this.body,
            method: this.method,
        });
    };
    SpecterRequest.parseRequest = function (req) {
        var r = JSON.parse(req);
        return new SpecterRequest(r.resource, {
            headers: r.headers,
            query: r.query,
            body: r.body,
            method: r.method,
        });
    };
    SpecterRequest.parseRequests = function (reqs) {
        var rs = reqs.split("__sep__");
        return rs.map(SpecterRequest.parseRequest);
    };
    return SpecterRequest;
}());
exports.default = SpecterRequest;
