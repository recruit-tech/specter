"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const request_1 = __importDefault(require("./request"));
class Specter {
    static registerService(service) {
        Specter.services.set(service.name, service);
    }
    static getService(name) {
        const service = Specter.services.get(name);
        if (!service) {
            throw new Error(`Service not found: ${name}`);
        }
        return service;
    }
    static isRegistered(name) {
        return Specter.services.has(name);
    }
    // cast は外から見て絶対わからないだろうという時に使う
    static createMiddleware(options) {
        return async (req, res, next) => {
            try {
                if (!req.url) {
                    throw new Error("req url is not found.");
                }
                const url = url_1.parse(req.url);
                if (!url.pathname) {
                    throw new Error("url pathname is not found.");
                }
                const resource = url.pathname.substr(1).split("/").shift() || "";
                const request = new request_1.default(resource, req);
                if (!request.resource) {
                    next();
                    return;
                }
                if (!Specter.isRegistered(request.resource)) {
                    next();
                    return;
                }
                // static じゃなくて instantiate できるオブジェクトのがtest書きやすい
                const service = Specter.getService(request.resource);
                const response = await service.execute(request);
                res.status(response.status || 200);
                const header = response.header;
                for (const key of Object.keys(header)) {
                    const value = header[key];
                    res.setHeader(key, value);
                }
                if (response.body) {
                    res.send(response.body);
                }
            }
            catch (e) {
                console.error(e);
                res.status(500);
                res.send(e);
            }
            return;
        };
    }
}
Specter.services = new Map();
exports.default = Specter;
