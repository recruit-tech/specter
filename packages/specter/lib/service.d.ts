/// <reference types="node" />
import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { IncomingHttpHeaders } from "http";
declare type DefaultRequest = SpecterRequest<IncomingHttpHeaders, any, any>;
declare type DefaultResponse = SpecterResponse<any, any>;
export default class Service {
    name: string;
    config: any;
    constructor(name: string, config: any);
    execute(req: DefaultRequest): Promise<DefaultResponse>;
    create(req: DefaultRequest): Promise<DefaultResponse>;
    read(req: DefaultRequest): Promise<DefaultResponse>;
    update(req: DefaultRequest): Promise<DefaultResponse>;
    delete(req: DefaultRequest): Promise<DefaultResponse>;
    exist(req: DefaultRequest): Promise<DefaultResponse>;
    preCheck(req: DefaultRequest): Promise<boolean>;
    nextReqs(req: DefaultRequest, res: DefaultResponse): Promise<DefaultRequest[]>;
}
export {};
