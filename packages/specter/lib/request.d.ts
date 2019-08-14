/// <reference types="node" />
import { IncomingMessage, IncomingHttpHeaders } from "http";
import { Request as ExpressRequest } from "express";
declare type Request = ExpressRequest | IncomingMessage;
export default class SpecterRequest<H extends IncomingHttpHeaders, Q extends any, B extends any> {
    resource: string;
    headers: H | IncomingHttpHeaders;
    query: Q;
    body: B;
    method?: string;
    req: object;
    constructor(resource: string, req: Request | {
        method?: string;
        headers: H;
        query: Q;
        body: B;
    });
}
export {};
