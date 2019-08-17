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
    execute(request) {
        if (!request.method) {
            throw new Error("Request method not found");
        }
        if (!specter_1.default.isRegistered(request.resource)) {
            throw new Error(`Service is not registered ${request.resource}`);
        }
        const service = specter_1.default.getService(request.resource);
        const response = service.execute(request);
        return response;
    }
    create(request) {
        request.method = "POST";
        return this.execute(request);
    }
    read(request) {
        request.method = "GET";
        return this.execute(request);
    }
    update(request) {
        request.method = "PUT";
        return this.execute(request);
    }
    delete(request) {
        request.method = "DELETE";
        return this.execute(request);
    }
    exists(request) {
        request.method = "HEAD";
        return this.execute(request);
    }
}
exports.default = SpecterClient;
