"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpecterNetworkError extends Error {
    constructor(message, status, statusText, request, response) {
        super(`Specter Error: ${message}`);
        this.isSpecterError = true;
        this.req = request;
        this.res = response;
        this.status = status;
        this.statusText = statusText;
    }
}
exports.SpecterNetworkError = SpecterNetworkError;
function isSpecterError(err) {
    if (err && typeof err === "object")
        return !!err.isSpecterError || false;
    return false;
}
exports.isSpecterError = isSpecterError;
class SpecterError {
    constructor(code, message, error) {
        this.code = code;
        this.message = message;
        this.error = error;
    }
}
var SpecterErrorType;
(function (SpecterErrorType) {
    SpecterErrorType[SpecterErrorType["NotImplemented"] = 1] = "NotImplemented";
    SpecterErrorType[SpecterErrorType["NotSupportedMethod"] = 2] = "NotSupportedMethod";
})(SpecterErrorType || (SpecterErrorType = {}));
exports.NotImplemented = new SpecterError(SpecterErrorType.NotImplemented, "not implemented");
exports.NotSupportedMethod = new SpecterError(SpecterErrorType.NotSupportedMethod, "not supported method");
