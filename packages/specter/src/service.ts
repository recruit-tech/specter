import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { IncomingHttpHeaders } from "http";
import { NotImplemented, NotSupportedMethod } from "./errors";

type DefaultRequest = SpecterRequest<IncomingHttpHeaders, any, any>;
type DefaultResponse = SpecterResponse<any, any>;

export default class Service {
  name: string;
  config: {};
  constructor(name: string, config: {}) {
    this.name = name;
    this.config = config;
  }
  async execute<Response extends DefaultResponse>(
    req: DefaultRequest
  ): Promise<Response> {
    const check = await this.preCheck(req);
    if (!check) {
      return Promise.reject(new Error("Precheck failed."));
    }
    let res;
    if (req.method === "GET" && this.read) {
      res = await this.read<Response>(req);
    } else if (req.method === "POST" && this.create) {
      res = await this.create<Response>(req);
    } else if (req.method === "PUT" && this.update) {
      res = await this.update<Response>(req);
    } else if (req.method === "DELETE" && this.delete) {
      res = await this.delete<Response>(req);
    } else if (req.method === "HEAD" && this.exist) {
      res = await this.exist<Response>(req);
    }

    if (!res) {
      return Promise.reject(NotSupportedMethod);
    }

    return res as Response;
  }
  create<Response extends DefaultResponse>(
    req: DefaultRequest
  ): Promise<DefaultResponse> {
    return Promise.reject(NotImplemented);
  }
  read<Response extends DefaultResponse>(
    req: DefaultRequest
  ): Promise<DefaultResponse> {
    return Promise.reject(NotImplemented);
  }
  update<Response extends DefaultResponse>(
    req: DefaultRequest
  ): Promise<DefaultResponse> {
    return Promise.reject(NotImplemented);
  }
  delete<Response extends DefaultResponse>(
    req: DefaultRequest
  ): Promise<DefaultResponse> {
    return Promise.reject(NotImplemented);
  }
  exist<Response extends DefaultResponse>(
    req: DefaultRequest
  ): Promise<DefaultResponse> {
    return Promise.reject(NotImplemented);
  }
  preCheck(req: DefaultRequest): Promise<boolean> {
    return Promise.resolve(true);
  }
}
