"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
