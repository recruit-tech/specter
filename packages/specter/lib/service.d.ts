/// <reference types="node" />
import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { IncomingHttpHeaders } from "http";
declare type DefaultRequest = SpecterRequest<IncomingHttpHeaders, any, any>;
declare type DefaultResponse = Promise<SpecterResponse<any, any>>;
export default class Service {
    name: string;
    config: any;
    constructor(name: string, config: any);
    execute(req: DefaultRequest): DefaultResponse;
    create(req: DefaultRequest): DefaultResponse;
    read(req: DefaultRequest): DefaultResponse;
    update(req: DefaultRequest): DefaultResponse;
    delete(req: DefaultRequest): DefaultResponse;
    exist(req: DefaultRequest): DefaultResponse;
    preCheck(req: DefaultRequest): Promise<this>;
}
export {};
