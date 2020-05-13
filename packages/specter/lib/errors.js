"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpecterNetworkError extends Error {
  constructor(message, status, statusText, request, response) {
    super(`Specter Error: ${message}`);
    this.isSpecterNetworkError = true;
    this.req = request;
    this.res = response;
    this.status = status;
    this.statusText = statusText;
  }
}
exports.SpecterNetworkError = SpecterNetworkError;
function isSpecterNetworkError(err) {
  if (err && typeof err === "object") return !!err.isSpecterNetworkError;
  return false;
}
exports.isSpecterNetworkError = isSpecterNetworkError;
class SpecterError {
  constructor(code, message, error) {
    this.code = code;
    this.message = message;
    this.error = error;
  }
}
var SpecterErrorType;
(function(SpecterErrorType) {
  SpecterErrorType[(SpecterErrorType["NotImplemented"] = 1)] = "NotImplemented";
  SpecterErrorType[(SpecterErrorType["NotSupportedMethod"] = 2)] =
    "NotSupportedMethod";
})(SpecterErrorType || (SpecterErrorType = {}));
exports.NotImplemented = new SpecterError(
  SpecterErrorType.NotImplemented,
  "not implemented"
);
exports.NotSupportedMethod = new SpecterError(
  SpecterErrorType.NotSupportedMethod,
  "not supported method"
);
