import { NotImplemented, NotSupportedMethod } from "./errors";
export default class Service {
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
            return Promise.reject(NotSupportedMethod);
        }
        return res;
    }
    create(req) {
        return Promise.reject(NotImplemented);
    }
    read(req) {
        return Promise.reject(NotImplemented);
    }
    update(req) {
        return Promise.reject(NotImplemented);
    }
    delete(req) {
        return Promise.reject(NotImplemented);
    }
    exist(req) {
        return Promise.reject(NotImplemented);
    }
    preCheck(req) {
        return Promise.resolve(true);
    }
}
