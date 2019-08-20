import { parse } from "url";
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
  RequestHandler
} from "express";
import SpecterRequest from "./request";
import Service from "./service";

export default class Specter {
  private static services = new Map<string, Service>();

  static registerService(service: Service) {
    Specter.services.set(service.name, service);
  }

  static getService(name: string): Service {
    const service = Specter.services.get(name);
    if (!service) {
      throw new Error(`Service not found: ${name}`);
    }

    return service;
  }

  static isRegistered(name: string): boolean {
    return Specter.services.has(name);
  }

  static createMiddleware(options: any): RequestHandler {
    return async (
      req: ExpressRequest,
      res: ExpressResponse,
      next: Function
    ) => {
      try {
        if (!req.url) {
          throw new Error("req url is not found.");
        }
        const url = parse(req.url);
        if (!url.pathname) {
          throw new Error("url pathname is not found.");
        }
        const resource = url.pathname
          .substr(1)
          .split("/")
          .shift();
        if (!resource) {
          throw new Error("resource is not found.");
        }
        const request = new SpecterRequest(resource, req);
        if (!Specter.isRegistered(request.resource)) {
          throw new Error(`resource: ${resource} is not registered.`);
        }

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
        } else {
          res.end(null);
        }
      } catch (e) {
        console.error(e);
        res.status(500);
        res.send(e);
      }
      return;
    };
  }
}
