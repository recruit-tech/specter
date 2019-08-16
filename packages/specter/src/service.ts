import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { IncomingHttpHeaders } from "http";
import { NotImplemented, NotSupportedMethod } from "./errors";

type DefaultRequest = SpecterRequest<IncomingHttpHeaders, any, any>;
type DefaultResponse = SpecterResponse<any, any>;

export default class Service {
    name: string;
    config: any;
    constructor(name: string, config: any) {
        this.name = name;
        this.config = config;
    }
    async execute(req: DefaultRequest): Promise<DefaultResponse> {
        const check = await this.preCheck(req);
        if (!check) {
            return Promise.reject(new Error("Precheck failed."));
        }
        let res;
        if (req.method === "GET" && this.read) {
            res = await this.read(req);
        } else if (req.method === "POST" && this.create) {
            res = await this.create(req);
        } else if (req.method === "PUT" && this.update) {
            res = await this.update(req);
        } else if (req.method === "DELETE" && this.delete) {
            res = await this.delete(req);
        } else if (req.method === "HEAD" && this.exist) {
            res = await this.exist(req);
        }

        if (!res) {
            return Promise.reject(NotSupportedMethod);
        }

        return res;
    }
    create(req: DefaultRequest): Promise<DefaultResponse> {
        return Promise.reject(NotImplemented);
    }
    read(req: DefaultRequest): Promise<DefaultResponse> {
        return Promise.reject(NotImplemented);
    }
    update(req: DefaultRequest): Promise<DefaultResponse> {
        return Promise.reject(NotImplemented);
    }
    delete(req: DefaultRequest): Promise<DefaultResponse> {
        return Promise.reject(NotImplemented);
    }
    exist(req: DefaultRequest): Promise<DefaultResponse> {
        return Promise.reject(NotImplemented);
    }
    preCheck(req: DefaultRequest): Promise<boolean> {
        return Promise.resolve(true);
    }
    nextReqs(
        req: DefaultRequest,
        res: DefaultResponse
    ): Promise<DefaultRequest[]> {
        return Promise.resolve([]);
    }
}
