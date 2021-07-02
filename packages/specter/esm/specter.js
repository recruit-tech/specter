import { parse } from "url";
import SpecterRequest from "./request";
const DefaultContentType = "application/json";
export default class Specter {
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
    static createMiddleware(options) {
        return async (req, res, next) => {
            try {
                if (!req.url) {
                    throw new Error("req url is not found.");
                }
                const url = parse(req.url);
                if (!url.pathname) {
                    throw new Error("url pathname is not found.");
                }
                const resource = url.pathname.substr(1).split("/").shift();
                if (!resource) {
                    throw new Error("resource is not found.");
                }
                const request = new SpecterRequest(resource, req);
                if (!Specter.isRegistered(request.resource)) {
                    throw new Error(`resource: ${resource} is not registered.`);
                }
                const service = Specter.getService(request.resource);
                const response = await service.execute(request);
                const headers = {};
                headers["content-type"] = DefaultContentType;
                for (const [key, value] of Object.entries(response.headers)) {
                    headers[key] = value;
                }
                headers["access-control-expose-headers"] =
                    Object.keys(headers).join(",");
                res.writeHead(response.status || 200, headers);
                if (response.body) {
                    res.end(JSON.stringify(response.body));
                }
                else {
                    res.end(null);
                }
            }
            catch (e) {
                next(e);
            }
            return;
        };
    }
}
Specter.services = new Map();
