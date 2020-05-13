"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpecterResponse {
    constructor(headers, body) {
        this.headers = headers;
        this.body = body;
    }
    setStatus(status) {
        this.status = status;
    }
    setNextReqs(...reqs) {
        this.headers = {
            ...this.headers,
            "x-specter-next-reqs": reqs.map(req => req.toString()).join("__sep__")
        };
        this.nextReqs = reqs;
    }
    appendHeader(key, value) {
        this.headers[key] = value;
    }
    setError(error) {
        this.error = error;
    }
    getNextReqs() {
        return this.nextReqs;
    }
    static parse(res) {
        const parsed = JSON.parse(res);
        const response = new SpecterResponse(parsed.headers, parsed.body);
        response.setStatus(parsed.status);
        return response;
    }
    toString() {
        return JSON.stringify({
            status: this.status,
            headers: this.headers,
            body: this.body
        });
    }
}
exports.default = SpecterResponse;
