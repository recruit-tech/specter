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
    setError(error) {
        this.error = error;
    }
    getNextReqs() {
        return this.nextReqs;
    }
}
exports.default = SpecterResponse;
