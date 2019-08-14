"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
class Service {
    constructor(name, config) {
        this.name = name;
        this.config = config;
    }
    execute(req) {
        if (req.method === "GET" && this.read) {
            return this.read(req);
        }
        else if (req.method === "POST" && this.create) {
            return this.create(req);
        }
        else if (req.method === "PUT" && this.update) {
            return this.update(req);
        }
        else if (req.method === "DELETE" && this.delete) {
            return this.delete(req);
        }
        else if (req.method === "HEAD" && this.exist) {
            return this.exist(req);
        }
        return Promise.reject(errors_1.NotSupportedMethod);
    }
    create(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    ;
    read(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    ;
    update(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    ;
    delete(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    ;
    exist(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    ;
    preCheck(req) {
        return Promise.resolve(this);
    }
    ;
}
exports.default = Service;
