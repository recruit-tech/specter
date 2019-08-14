"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SpecterRequest = /** @class */ (function () {
    function SpecterRequest(resource, request) {
        this.resource = resource;
        this.headers = request.headers;
        this.query = request.query;
        this.body = request.body;
        this.req = request;
    }
    return SpecterRequest;
}());
exports.default = SpecterRequest;
