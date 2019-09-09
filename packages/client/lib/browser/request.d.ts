export default class SpecterRequest<H extends any, Q extends any, B extends any> {
    resource: string;
    headers: H;
    query: Q;
    body?: B;
    method?: string;
    req: object;
    constructor(resource: string, request: {
        headers: H;
        query: Q;
        body?: B;
        method?: string;
    });
    toHeader(): string;
    static parseRequest(req: string): SpecterRequest<any, any, any>;
    static parseRequests(reqs: string): SpecterRequest<any, any, any>[];
}
