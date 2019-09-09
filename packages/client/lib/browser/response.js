"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("@specter/specter/lib/request"));
var SpecterResponse = /** @class */ (function () {
    function SpecterResponse(header, body) {
        this.header = header;
        this.body = body;
    }
    SpecterResponse.prototype.getNextReqs = function () {
        var nextReqs = this.header["x-specter-next-reqs"];
        var reqs = nextReqs
            .split("__sep__")
            .map(function (req) { return request_1.default.parseRequest(req); });
        return reqs;
    };
    return SpecterResponse;
}());
exports.default = SpecterResponse;
