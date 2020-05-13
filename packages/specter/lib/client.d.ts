/// <reference types="node" />
import SpecterRequest from "./request";
import SpecterResponse from "./response";
import { IncomingHttpHeaders } from "http";
declare type DefaultRequest = SpecterRequest<IncomingHttpHeaders, any, any>;
declare type DefaultResponse = SpecterResponse<any, any>;
export default class SpecterClient {
    options?: object;
    constructor(options?: any);
    execute<Res extends DefaultResponse>(request: DefaultRequest, restype?: {
        new (): Res;
    }): Promise<Res>;
    create<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res>;
    read<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res>;
    update<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res>;
    delete<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res>;
    exists<Res extends DefaultResponse>(request: DefaultRequest): Promise<Res>;
}
export {};
