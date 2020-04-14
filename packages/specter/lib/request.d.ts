/// <reference types="node" />
import { IncomingMessage, IncomingHttpHeaders } from "http";
import { Request as ExpressRequest } from "express";
declare type Request = ExpressRequest | IncomingMessage;
export declare type AnyRequest = SpecterRequest<{}, {}, {}>;
export declare namespace Specter {
    interface ActualRequest {
    }
}
export default class SpecterRequest<H extends IncomingHttpHeaders, Q extends any, B extends any = {}> {
    resource: string;
    headers: H | IncomingHttpHeaders;
    query: Q;
    body: B;
    method?: string;
    req: Specter.ActualRequest;
    constructor(resource: string, req: Request | {
        method?: string;
        headers: H;
        query: Q;
        body?: B;
    });
    static parseRequest(req: string): SpecterRequest<any, any, any>;
    toString(): string;
}
export {};
