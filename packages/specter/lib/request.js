"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpecterRequest {
    constructor(resource, req) {
        this.resource = resource;
        this.method = req.method;
        this.query = req.query || {};
        this.headers = req.headers || {};
        this.body = req.body || {};
        if (!this.body) {
            throw new Error("Not Supported Yet.");
        }
        this.req = req;
    }
}
exports.default = SpecterRequest;
