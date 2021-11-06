"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var specter_1 = (0, tslib_1.__importDefault)(require("./specter"));
var SpecterClient = /** @class */ (function () {
    function SpecterClient(options) {
        this.options = options;
    }
    SpecterClient.prototype.execute = function (request, restype) {
        if (!request.method) {
            throw new Error("Request method not found");
        }
        if (!specter_1.default.isRegistered(request.resource)) {
            throw new Error("Service is not registered " + request.resource);
        }
        var service = specter_1.default.getService(request.resource);
        var response = service.execute(request);
        return response;
    };
    SpecterClient.prototype.create = function (request) {
        request.method = "POST";
        return this.execute(request);
    };
    SpecterClient.prototype.read = function (request) {
        request.method = "GET";
        return this.execute(request);
    };
    SpecterClient.prototype.update = function (request) {
        request.method = "PUT";
        return this.execute(request);
    };
    SpecterClient.prototype.delete = function (request) {
        request.method = "DELETE";
        return this.execute(request);
    };
    SpecterClient.prototype.exists = function (request) {
        request.method = "HEAD";
        return this.execute(request);
    };
    return SpecterClient;
}());
exports.default = SpecterClient;
