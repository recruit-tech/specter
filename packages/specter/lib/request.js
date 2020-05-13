"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpecterRequest {
    constructor(resource, req) {
        var _a;
        this.resource = resource;
        this.method = req.method;
        this.query = ((_a = req) === null || _a === void 0 ? void 0 : _a.query) || {};
        this.headers = req.headers || {};
        this.body = req.body || {};
        if (!this.body) {
            throw new Error("Not Supported Yet.");
        }
        this.req = req;
    }
    static parseRequest(req) {
        const parsed = JSON.parse(req);
        return new SpecterRequest(parsed.resource, {
            method: parsed.method,
            headers: parsed.headers,
            query: parsed.query,
            body: parsed.body
        });
    }
    toString() {
        return JSON.stringify({
            resource: this.resource,
            headers: this.headers,
            query: this.query,
            body: this.body,
            method: this.method
        });
    }
}
exports.default = SpecterRequest;
