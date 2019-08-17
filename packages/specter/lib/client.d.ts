/// <reference types="node" />
import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { IncomingHttpHeaders } from "http";
declare type DefaultRequest = SpecterRequest<IncomingHttpHeaders, any, any>;
declare type DefaultResponse = SpecterResponse<any, any>;
export default class SpecterClient {
    options?: object;
    constructor(options?: any);
    execute<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res | DefaultResponse>;
    create<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res | DefaultResponse>;
    read<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res | DefaultResponse>;
    update<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res | DefaultResponse>;
    delete<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res | DefaultResponse>;
    exists<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res | DefaultResponse>;
}
export {};
