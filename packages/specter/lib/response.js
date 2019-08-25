"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpecterResponse {
    constructor(header, body) {
        this.header = header;
        this.body = body;
    }
    setStatus(status) {
        this.status = status;
    }
    setNextReqs(...reqs) {
        this.header = {
            ...this.header,
            "x-specter-next-reqs": reqs.map(req => req.toString())
        };
        this.requests = reqs;
    }
    setError(error) {
        this.error = error;
    }
    getNextReqs() {
        return this.requests;
    }
}
exports.default = SpecterResponse;
