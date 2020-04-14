"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("@specter/specter/lib/request"));
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
    return SpecterResponse;
}());
exports.default = SpecterResponse;
