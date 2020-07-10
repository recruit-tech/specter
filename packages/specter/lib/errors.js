"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSpecterError = exports.NotSupportedMethod = exports.NotImplemented = exports.isSpecterNetworkError = exports.SpecterNetworkError = void 0;
var tslib_1 = require("tslib");
var SpecterNetworkError = /** @class */ (function (_super) {
    tslib_1.__extends(SpecterNetworkError, _super);
    function SpecterNetworkError(message, status, statusText, request, response) {
        var _this = _super.call(this, "Specter Error: " + message) || this;
        _this.isSpecterNetworkError = true;
        _this.req = request;
        _this.res = response;
        _this.status = status;
        _this.statusText = statusText;
        return _this;
    }
    return SpecterNetworkError;
}(Error));
exports.SpecterNetworkError = SpecterNetworkError;
function isSpecterNetworkError(err) {
    if (err && typeof err === "object")
        return !!err.isSpecterNetworkError;
    return false;
}
exports.isSpecterNetworkError = isSpecterNetworkError;
var SpecterError = /** @class */ (function () {
    function SpecterError(code, message, error) {
        this.code = code;
        this.message = message;
        this.error = error;
    }
    return SpecterError;
}());
var SpecterErrorType;
(function (SpecterErrorType) {
    SpecterErrorType[SpecterErrorType["NotImplemented"] = 1] = "NotImplemented";
    SpecterErrorType[SpecterErrorType["NotSupportedMethod"] = 2] = "NotSupportedMethod";
})(SpecterErrorType || (SpecterErrorType = {}));
exports.NotImplemented = new SpecterError(SpecterErrorType.NotImplemented, "not implemented");
exports.NotSupportedMethod = new SpecterError(SpecterErrorType.NotSupportedMethod, "not supported method");
function isSpecterError(err) {
    return err && err instanceof SpecterError;
}
exports.isSpecterError = isSpecterError;
