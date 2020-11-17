export class SpecterNetworkError extends Error {
    constructor(message, status, statusText, request, response) {
        super(`Specter Error: ${message}`);
        this.isSpecterNetworkError = true;
        this.req = request;
        this.res = response;
        this.status = status;
        this.statusText = statusText;
    }
}
export function isSpecterNetworkError(err) {
    if (err && typeof err === "object")
        return !!err.isSpecterNetworkError;
    return false;
}
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
export const NotImplemented = new SpecterError(SpecterErrorType.NotImplemented, "not implemented");
export const NotSupportedMethod = new SpecterError(SpecterErrorType.NotSupportedMethod, "not supported method");
export function isSpecterError(err) {
    return err && err instanceof SpecterError;
}
