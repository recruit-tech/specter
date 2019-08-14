"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const specter_1 = __importDefault(require("./specter"));
class SpecterClient {
    constructor(options) {
        this.options = options;
    }
    create(request) {
        const service = specter_1.default.getService(request.resource);
        request.method = "POST";
        return service.create(request);
    }
    read(request) {
        const service = specter_1.default.getService(request.resource);
        request.method = "GET";
        return service.read(request);
    }
    update(request) {
        const service = specter_1.default.getService(request.resource);
        request.method = "PUT";
        return service.update(request);
    }
    delete(request) {
        const service = specter_1.default.getService(request.resource);
        request.method = "DELETE";
        return service.delete(request);
    }
    exists(request) {
        const service = specter_1.default.getService(request.resource);
        return service.exist(request);
    }
}
exports.default = SpecterClient;
