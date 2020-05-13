"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./errors");
class Service {
    constructor(name, config) {
        this.name = name;
        this.config = config;
    }
    async execute(req) {
        const check = await this.preCheck(req);
        if (!check) {
            return Promise.reject(new Error("Precheck failed."));
        }
        let res;
        if (req.method === "GET" && this.read) {
            res = await this.read(req);
        }
        else if (req.method === "POST" && this.create) {
            res = await this.create(req);
        }
        else if (req.method === "PUT" && this.update) {
            res = await this.update(req);
        }
        else if (req.method === "DELETE" && this.delete) {
            res = await this.delete(req);
        }
        else if (req.method === "HEAD" && this.exist) {
            res = await this.exist(req);
        }
        if (!res) {
            return Promise.reject(errors_1.NotSupportedMethod);
        }
        return res;
    }
    create(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    read(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    update(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    delete(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    exist(req) {
        return Promise.reject(errors_1.NotImplemented);
    }
    preCheck(req) {
        return Promise.resolve(true);
    }
}
exports.default = Service;
