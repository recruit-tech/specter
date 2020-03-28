"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SpecterError = /** @class */ (function (_super) {
    __extends(SpecterError, _super);
    function SpecterError(message, status, statusText, request, response) {
        var _this = _super.call(this, "Specter Error: " + message) || this;
        _this.isSpecterError = true;
        _this.req = request;
        _this.res = response;
        _this.status = status;
        _this.statusText = statusText;
        return _this;
    }
    return SpecterError;
}(Error));
exports.SpecterError = SpecterError;
function isSpecterError(err) {
    if (err && typeof err === "object")
        return !!err.isSpecterError || false;
    return false;
}
exports.isSpecterError = isSpecterError;
