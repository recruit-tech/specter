import { __extends } from "tslib";
var SpecterNetworkError = /** @class */ (function (_super) {
    __extends(SpecterNetworkError, _super);
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
export { SpecterNetworkError };
export function isSpecterNetworkError(err) {
    if (err && typeof err === "object")
        return !!err.isSpecterNetworkError;
    return false;
}
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
export var NotImplemented = new SpecterError(SpecterErrorType.NotImplemented, "not implemented");
export var NotSupportedMethod = new SpecterError(SpecterErrorType.NotSupportedMethod, "not supported method");
