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
}
exports.default = SpecterResponse;
